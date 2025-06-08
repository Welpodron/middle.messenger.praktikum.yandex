import type {
  TChatUsersAddRequestParams,
  TChatUsersGetRequestParams,
  TChatUsersRemoveRequestParams,
  TCreateChatRequestParams,
} from '@api/Chats';
import type { TChatUser, TMessage } from '@app/types/api';
import type { TQueryState } from '@modules/HTTPClient';

import { ChatsAPI } from '@api/Chats';
import { Router } from '@modules/Router';
import { Store } from '@modules/Store';
import { transactify, type TTransactify } from '@modules/Transaction';
import { WSClient } from '@modules/WSClient';
import { WSClientEvents } from '@modules/WSClient/constants';
import { crc32 } from '@utils/crc32';
import { uuid } from '@utils/uuid';

const RETRY_TIMEOUT = 2500;
const SPLIT_MESSAGES_CHUNK_SIZE = 20; // Количество сообщений, которые мы получаем за один раз из ws

class _ChatsController {
  private _wsClient: WSClient | null = null;
  private _abortController = new AbortController();
  private _retryTimeout?: ReturnType<typeof setTimeout>;

  create({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TCreateChatRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => ChatsAPI.create(queryParams),
      transaction: ({ queryData, queryParams }) => {
        if (!queryData?.id) {
          throw new Error('Не удалось создать чат');
        }

        const user = Store.get('user');

        if (!user) {
          return Router.redirect('/login');
        }

        const createdChat = {
          id: queryData.id,
          title: queryParams.title,
          avatar: null,
          unread_counter: 0,
          created_by: user.id,
          last_message: null,
        };

        Store.set('chats', [...Store.get('chats'), createdChat]);

        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: `Чат "${queryParams.title}" успешно создан`,
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }

  get() {
    transactify({
      queryParams: undefined,
      query: () => ChatsAPI.get(),
      transaction: ({ queryData }) => {
        if (!queryData) {
          throw new Error('Не удалось загрузить список чатов');
        }

        Store.set('chats', queryData);
      },
    });
  }

  // Chat users
  getUsers({ queryParams }: TTransactify<TChatUsersGetRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => ChatsAPI.getUsers(queryParams),
      transaction: ({ queryData, queryParams }) => {
        if (!queryData) {
          throw new Error('Не удалось загрузить список пользователей в чате');
        }

        const currentUsers
          = Store.get(`chatsUsers.${queryParams.chatId}`) || [];

        for (const user of queryData) {
          if (!currentUsers.some(currentUser => currentUser.id === user.id)) {
            currentUsers.push(user);
          }
        }

        Store.set(`chatsUsers.${queryParams.chatId}`, currentUsers);
      },
    });
  }

  addUsers({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TChatUsersAddRequestParams>) {
    transactify({
      queryParams,
      query: async (queryParams) => {
        const { successful, aborted, unauthorized, error }
          = await ChatsAPI.addUsers(queryParams);

        if (!successful) {
          return {
            data: undefined,
            error,
            unauthorized,
            aborted,
          };
        }

        return ChatsAPI.getUsers(queryParams);
      },
      transaction: ({ queryData, queryParams }) => {
        if (!queryData) {
          throw new Error('Не удалось загрузить список пользователей в чате');
        }

        const currentUsers
          = Store.get(`chatsUsers.${queryParams.chatId}`) || [];

        for (const user of queryData) {
          if (!currentUsers.some(currentUser => currentUser.id === user.id)) {
            currentUsers.push(user);
          }
        }

        Store.set(`chatsUsers.${queryParams.chatId}`, currentUsers);

        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: 'Пользователи добавлены в чат',
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }

  removeUsers({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TChatUsersRemoveRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => ChatsAPI.removeUsers(queryParams),
      transaction: ({ queryParams }) => {
        const currentUsers
          = Store.get(`chatsUsers.${queryParams.chatId}`) || [];

        const nextUsers = currentUsers.filter(
          currentUser => queryParams.users.indexOf(currentUser.id) === -1,
        );

        Store.set(`chatsUsers.${queryParams.chatId}`, nextUsers);

        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: 'Пользователи удалены из чата',
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }

  // WS manipulations
  // CONNECT
  connect({ queryParams }: TTransactify<{ chatId: number; userId: number }>) {
    transactify({
      queryParams,
      onBeforeTransaction: () => {
        this.disconnect();
      },
      query: async (queryParams) => {
        // Все 3 запроса относятся к информации по чату, можно их запрашивать параллельно
        const queriesResults = await Promise.all([
          ChatsAPI.getToken({
            ...queryParams,
            signal: this._abortController.signal,
          }),
          ChatsAPI.getUnreadCounter({
            ...queryParams,
            signal: this._abortController.signal,
          }),
          ChatsAPI.getUsers({
            ...queryParams,
            signal: this._abortController.signal,
          }),
        ]);

        const [tokenQueryState, unreadCounterQueryState, usersQueryState]
          = queriesResults;

        const state: TQueryState<{
          token: string;
          users: TChatUser[];
          unreadCount: number;
        }> = {
          data: undefined,
          error: undefined,
          unauthorized: false,
          aborted: false,
        };

        for (const queryResult of queriesResults) {
          if (queryResult.error) {
            state.error = queryResult.error || 'Ошибка подключения к чату';
            return state;
          }

          if (queryResult.unauthorized) {
            state.unauthorized = true;
            return state;
          }

          if (queryResult.aborted) {
            state.aborted = true;
            return state;
          }
        }

        if (
          tokenQueryState.data?.token
          && unreadCounterQueryState.data?.unread_count !== undefined
          && usersQueryState.data
        ) {
          state.data = {
            token: tokenQueryState.data.token,
            users: usersQueryState.data,
            unreadCount: unreadCounterQueryState.data?.unread_count || 0,
          };
        }

        return state;
      },
      // Далее идет не особо приятная транзакция, которая объединяет много разной логики, но по факту она вся относится к одному действию подключения к чату, в целом ее бы можно было упростить если бы бэк сразу по чат айди отдавал всю инфы по чату одним запросом
      transaction: async ({ queryData, queryParams }) => {
        if (!queryData) {
          throw new Error('Не удалось получить данные для подключения к чату');
        }

        const { chatId, userId } = queryParams;
        const { token, unreadCount, users: newUsers } = queryData;

        // Обновляем список пользователей в чате при успешном подключении
        const currentUsers = Store.get(`chatsUsers.${chatId}`) || [];

        for (const newUser of newUsers) {
          if (
            !currentUsers.some(currentUser => currentUser.id === newUser.id)
          ) {
            currentUsers.push(newUser);
          }
        }

        Store.set(`chatsUsers.${chatId}`, currentUsers);

        this._wsClient = new WSClient(`/chats/${userId}/${chatId}/${token}`);

        // Кейс если админ добавил еще одного пользователя в чат, пока было открыто соединение
        this._wsClient.on(
          WSClientEvents.MESSAGE_USER_CONNECTION,
          (newUser: { content: string }) => {
            const currentUsers = Store.get(`chatsUsers.${chatId}`) || [];

            if (
              !currentUsers.some(
                currentUser => String(currentUser.id) === newUser.content,
              )
            ) {
              // При подключении нового пользователя обновляем список пользователей в чате
              this.getUsers({
                queryParams: {
                  chatId,
                  signal: this._abortController.signal,
                },
              });
            }
          },
        );

        // Иногда ws соединение закрывается самим бэком, даже учитывая пинг
        this._wsClient.on(WSClientEvents.DISCONNECT, (event: CloseEvent) => {
          if (!event.wasClean) {
            this._retryTimeout = setTimeout(() => {
              this.connect({
                queryParams: { chatId, userId },
              });
            }, RETRY_TIMEOUT);
          }
        });

        this._wsClient.on(
          WSClientEvents.MESSAGE,
          (newMessages: TMessage | TMessage[]) => {
            let nextMessages = new Map(Store.get(`chatsMessages.${chatId}`));

            if (!Array.isArray(newMessages)) {
              nextMessages.set(
                // TODO: по факту мб лучше использовать xxHash или MurmurHash
                crc32(
                  `${newMessages.time}${newMessages.user_id}${newMessages.content}`,
                ),
                newMessages,
              );
            }
            else {
              // Получаем либо при getMessages(0) либо когда загружаем старые сообщения
              for (const newMessage of newMessages) {
                nextMessages.set(
                  crc32(
                    `${newMessage.time}${newMessage.user_id}${newMessage.content}`,
                  ),
                  newMessage,
                );
              }
            }

            // Сортируем сообщения по времени
            nextMessages = new Map(
              [...nextMessages.entries()].sort((a, b) => {
                return Date.parse(a[1].time) - Date.parse(b[1].time);
              }),
            );

            Store.set(`chatsMessages.${chatId}`, nextMessages);
          },
        );

        await this._wsClient.connect();

        this.getMessages({
          chatId,
          offset: 0, // Получаем последние сообщения при подключении
          unreadCount,
        });
      },
    });
  }

  disconnect() {
    clearTimeout(this._retryTimeout);
    this._abortController.abort();
    this._abortController = new AbortController();
    this._wsClient?.disconnect();
    this._wsClient = null;
  }

  getMessages({
    chatId,
    offset,
    unreadCount,
  }: {
    chatId: number;
    offset?: number;
    unreadCount?: number;
  }) {
    if (unreadCount) {
      for (
        let i = 0;
        i < Math.ceil(unreadCount / SPLIT_MESSAGES_CHUNK_SIZE);
        i++
      ) {
        this._wsClient?.send({
          content: i * SPLIT_MESSAGES_CHUNK_SIZE,
          type: 'get old',
        });
      }

      return;
    }

    const currentMessages = Store.get(`chatsMessages.${chatId}`);

    this._wsClient?.send({
      content: offset !== undefined ? offset : currentMessages?.size ?? 0,
      type: 'get old',
    });
  }

  sendMessage(message: string) {
    this._wsClient?.send({ content: message, type: 'message' });
  }
}

export const ChatsController = new _ChatsController();
