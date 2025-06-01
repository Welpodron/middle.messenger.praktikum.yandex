import type { TSidebarChildren, TSidebarProps } from './types';

import { Block } from '@components/Block';
import { Button } from '@components/Button';
import { Drawer } from '@components/Drawer';
import { Link } from '@components/Link';
import { ChatsController } from '@controllers/Chats';
import iconChevronRight from '@icons/chevron-right.svg?raw';
import iconPlus from '@icons/plus.svg?raw';

import { ChatsConnector } from '../ChatsConnector';
import { FormChatCreate } from '../FormChatCreate';
import template from './Sidebar.hbs';
import classNames from './Sidebar.module.scss';

export class Sidebar extends Block<
  HTMLElement,
  TSidebarProps,
  TSidebarChildren
> {
  constructor() {
    super({
      LinkUser: new Link({
        url: '/settings',
        Children: ['Профиль', iconChevronRight],
        className: classNames.link,
      }),
      ChatsConnector: new ChatsConnector(undefined, {
        displayName: 'ChatsConnector',
      }),
      ButtonChatCreate: new Button({
        type: 'button',
        Children: ['Создать чат', iconPlus],
        isFull: true,
        onClick: () => {
          this.children.DrawerChatCreate.open();
        },
      }),
      DrawerChatCreate: new Drawer({
        title: 'Создать чат',
        position: 'left',
        Children: new FormChatCreate({
          onSubmit: (state) => {
            ChatsController.create({
              queryParams: state,
              onBeforeTransaction: () => {
                this.children.DrawerChatCreate.children.Children?.disable();
                this.children.DrawerChatCreate.children.Children.children.ButtonCreate.setProps({
                  isLoading: true,
                });
              },
              onAfterTransaction: () => {
                this.children.DrawerChatCreate.children.Children?.enable();
                this.children.DrawerChatCreate.children.Children.children.ButtonCreate.setProps({
                  isLoading: false,
                });
              },
              onSuccess: () => {
                this.children.DrawerChatCreate.close();
                this.children.DrawerChatCreate.children.Children?.reset();
              },
              onError: (error) => {
                this.children.DrawerChatCreate.children.Children?.toggleError(error);
                this.children.DrawerChatCreate.children.Children?.enable();
                this.children.DrawerChatCreate.children.Children.children.ButtonCreate.setProps({
                  isLoading: false,
                });
              },
            });
          },
        }),
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
