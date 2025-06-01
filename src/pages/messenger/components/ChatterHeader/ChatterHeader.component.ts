import type { TChatterHeaderChildren, TChatterHeaderProps } from './types';

import { Avatar } from '@components/Avatar';
import { Block } from '@components/Block';
import { Button } from '@components/Button';
import { Drawer } from '@components/Drawer';
import { ChatsController } from '@controllers/Chats';
import dotsVerticalIcon from '@icons/dots-vertical.svg?raw';
import plusIcon from '@icons/plus.svg?raw';
import xIcon from '@icons/x.svg?raw';
import { deepCompare } from '@utils/deepCompare';

import { FormChatUsersAdd } from '../FormChatUsersAdd';
import { FormChatUsersRemove } from '../FormChatUsersRemove';
import template from './ChatterHeader.hbs';

export class ChatterHeader extends Block<
  HTMLDivElement,
  TChatterHeaderProps,
  TChatterHeaderChildren
> {
  constructor(props: TChatterHeaderProps) {
    const { chat } = props ?? {};

    super({
      ...props,
      AvatarChat: new Avatar({
        picture: chat?.avatar,
        alt: chat?.title,
      }),
      ButtonChatActions: new Button({
        type: 'button',
        isSquare: true,
        Children: dotsVerticalIcon,
        onClick: () => {
          this.children.DrawerChatActions.open();
        },
      }),
      DrawerChatActions: new Drawer({
        title: 'Действия с чатом',
        Children: [
          new Button({
            type: 'button',
            Children: ['Добавить пользователей', plusIcon],
            onClick: () => {
              this.children.DrawerChatUsersAdd.open();
              this.children.DrawerChatActions.close();
            },
          }),
          new Button({
            type: 'button',
            isDanger: true,
            Children: ['Удалить пользователей', xIcon],
            onClick: () => {
              this.children.DrawerChatUsersRemove.open();
              this.children.DrawerChatActions.close();
            },
          }),
        ],
      }),
      DrawerChatUsersAdd: new Drawer({
        title: 'Добавить пользователей',
        Children: new FormChatUsersAdd({
          onSubmit: (state) => {
            if (this._props.chat?.id) {
              ChatsController.addUsers({
                queryParams: {
                  chatId: this._props.chat?.id,
                  users: state.usersIds.split(',').map(id => parseInt(id)).filter(id => id && !isNaN(id)),
                },
                onBeforeTransaction: () => {
                  this.children.DrawerChatUsersAdd.children.Children?.disable();
                  this.children.DrawerChatUsersAdd.children.Children.children.ButtonAdd.setProps({
                    isLoading: true,
                  });
                },
                onAfterTransaction: () => {
                  this.children.DrawerChatUsersAdd.children.Children?.enable();
                  this.children.DrawerChatUsersAdd.children.Children.children.ButtonAdd.setProps({
                    isLoading: false,
                  });
                },
                onSuccess: () => {
                  this.children.DrawerChatUsersAdd.close();
                  this.children.DrawerChatUsersAdd.children.Children?.reset();
                },
                onError: (error) => {
                  this.children.DrawerChatUsersAdd.children.Children?.toggleError(error);
                  this.children.DrawerChatUsersAdd.children.Children?.enable();
                  this.children.DrawerChatUsersAdd.children.Children.children.ButtonAdd.setProps({
                    isLoading: false,
                  });
                },
              });
            }
          },
        }),
      }),
      DrawerChatUsersRemove: new Drawer({
        title: 'Удалить пользователей',
        Children: new FormChatUsersRemove({
          onSubmit: (state) => {
            if (this._props.chat?.id) {
              ChatsController.removeUsers({
                queryParams: {
                  chatId: this._props.chat?.id,
                  users: state.usersIds.split(',').map(id => parseInt(id)).filter(id => id && !isNaN(id)),
                },
                onBeforeTransaction: () => {
                  this.children.DrawerChatUsersRemove.children.Children?.disable();
                  this.children.DrawerChatUsersRemove.children.Children.children.ButtonRemove.setProps({
                    isLoading: true,
                  });
                },
                onAfterTransaction: () => {
                  this.children.DrawerChatUsersRemove.children.Children?.enable();
                  this.children.DrawerChatUsersRemove.children.Children.children.ButtonRemove.setProps({
                    isLoading: false,
                  });
                },
                onSuccess: () => {
                  this.children.DrawerChatUsersRemove.close();
                  this.children.DrawerChatUsersRemove.children.Children?.reset();
                },
                onError: (error) => {
                  this.children.DrawerChatUsersRemove.children.Children?.toggleError(error);
                  this.children.DrawerChatUsersRemove.children.Children?.enable();
                  this.children.DrawerChatUsersRemove.children.Children.children.ButtonRemove.setProps({
                    isLoading: false,
                  });
                },
              });
            }
          },
        }),
      }),
    });
  }

  componentDidUpdate(oldProps: TChatterHeaderProps, currentProps: TChatterHeaderProps) {
    if (deepCompare(oldProps, currentProps)) {
      return false;
    }

    this.children.DrawerChatUsersAdd.children.Children.reset();
    this.children.DrawerChatUsersRemove.children.Children.reset();

    this.children.AvatarChat.setProps({
      picture: currentProps.chat?.avatar,
      alt: currentProps.chat?.title,
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}
