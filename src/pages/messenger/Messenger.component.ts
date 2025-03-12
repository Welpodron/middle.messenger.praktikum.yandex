import type { TChat } from '@app/types/api';
import type { TFormChatSearchState } from './components/FormChatSearch';
import type { TMessengerChildren, TMessengerProps } from './types';

import { debounce } from '@utils/debounce';
import { deepCompare } from '@utils/deepCompare';

import { Block } from '@components/Block';
import { Dialog } from '@components/Dialog';
import { Sidebar } from './components/Sidebar';
import { Chatter } from './components/Chatter';
import { ChatterBox } from './components/ChatterBox';
import { FormChatCreate } from './components/FormChatCreate';
import { Chat } from './components/Chat';

import { PAGE_TITLE } from './constants';

import template from './Messenger.hbs';

// TODO: Нужно в целом сделать ренейминг внутренних компонентов и прийти к какой-то общей конвенции по неймингу остальных компонентов в проекте
export class Messenger extends Block<HTMLDivElement, TMessengerProps, TMessengerChildren> {
  // Ref аналог полей, которое стабильно при ререндере
  activeChat?: TChat;
  search = '';
  filteredChats: TChat[] = [];

  constructor(props: Omit<TMessengerProps, 'title'>) {
    super({
      ...props,
      title: PAGE_TITLE,
      Sidebar: new Sidebar({
        currentUser: props.currentUser,
        chats: props.chats,
        onChatClick: (chatId) => {
          this.selectChat(chatId);
        },
        onClickCreateChat: () => {
          this.children.DialogCreateChat.show();
        },
        // TODO: Стоит вообще в целом узнать мб тут запросы будут на бэк, а не поиск на фронте
        onSearch: debounce(({ search }: TFormChatSearchState) => {
          const value = search
            .toLowerCase()
            .trim();

          if (value === this.search) {
            return;
          }

          this.search = value;

          let filtered = this.props.chats;

          if (value) {
            filtered = this.props.chats.filter((chat) => {
              return chat.title.toLowerCase().includes(value);
            });
          }

          if (deepCompare(this.filteredChats, filtered)) {
            return;
          }

          this.children.Sidebar.children.ChatsList.setChildren({
            Chats: filtered.map(
              chat =>
                new Chat({
                  ...chat,
                  isActive: chat.id === this.activeChat?.id,
                  onClick: (chatId) => {
                    this.selectChat(chatId);
                  },
                }),
            ),
          });

          this.filteredChats = filtered;
        }, 500),
      }),
      Chatter: new Chatter(),
      DialogCreateChat: new Dialog({
        title: 'Создать чат',
        Children: new FormChatCreate({
          onSubmit: (state) => {
            console.log(state);
          },
        }),
      }),
    });

    this.filteredChats = props.chats;
  }

  selectChat(chatId: string) {
    if (chatId === this.activeChat?.id) {
      return;
    }

    this.children.Sidebar.children.ChatsList.children.Chats.forEach((chat) => {
      chat.toggle(chat.props.id === chatId);
    });

    const chat = this.props.chats.find(chat => chat.id === chatId);

    if (chat) {
      this.children.Chatter.setChildren({
        ChatterBox: new ChatterBox({
          currentUser: this.props.currentUser,
          chat,
          onSendMessage: async (message) => {
            console.log(message);
          },
        }),
      });
    }

    this.activeChat = chat;
  }

  render() {
    return this.compile(template);
  }
}
