import type {
  TChatUsersAddRequestParams,
  TChatUsersAddResponseData,
  TChatUsersGetRequestParams,
  TChatUsersGetResponseData,
  TChatUsersRemoveRequestParams,
  TChatUsersRemoveResponseData,
  TCreateChatRequestParams,
  TCreateChatResponseData,
  TGetChatsResponseData,
  TGetChatTokenRequestParams,
  TGetChatTokenResponseData,
  TGetChatUnreadCounterRequestParams,
  TGetChatUnreadCounterResponseData,
} from './types';

import { HTTPClient, query } from '@modules/HTTPClient';

export class ChatsAPI {
  static ENTRYPOINT = '/chats';

  static create(params: TCreateChatRequestParams) {
    return query(() =>
      HTTPClient.post<TCreateChatResponseData>(`${ChatsAPI.ENTRYPOINT}`, {
        data: params,
      }),
    );
  }

  static get() {
    return query(() =>
      HTTPClient.get<TGetChatsResponseData>(`${ChatsAPI.ENTRYPOINT}`),
    );
  }

  static getUsers(params: TChatUsersGetRequestParams) {
    return query(() =>
      HTTPClient.get<TChatUsersGetResponseData>(
        `${ChatsAPI.ENTRYPOINT}/${params.chatId}/users`,
      ),
    );
  }

  static addUsers(
    params: TChatUsersAddRequestParams,
  ) {
    return query(() =>
      HTTPClient.put<TChatUsersAddResponseData>(
        `${ChatsAPI.ENTRYPOINT}/users`,
        {
          data: params,
        },
      ),
    );
  }

  static removeUsers(
    params: TChatUsersRemoveRequestParams,
  ) {
    return query(() =>
      HTTPClient.delete<TChatUsersRemoveResponseData>(
        `${ChatsAPI.ENTRYPOINT}/users`,
        {
          data: params,
        },
      ),
    );
  }

  static getUnreadCounter(
    params: TGetChatUnreadCounterRequestParams,
  ) {
    return query(() =>
      HTTPClient.get<TGetChatUnreadCounterResponseData>(
        `${ChatsAPI.ENTRYPOINT}/new/${params.chatId}`,
        undefined,
        params.signal,
      ));
  }

  static getToken(params: TGetChatTokenRequestParams) {
    return query(() =>
      HTTPClient.post<TGetChatTokenResponseData>(
        `${ChatsAPI.ENTRYPOINT}/token/${params.chatId}`,
        undefined,
        params.signal,
      ));
  }
}
