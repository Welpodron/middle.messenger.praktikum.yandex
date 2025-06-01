import type { TBlockOptions } from '@components/Block';
import type { TUserConnectorChildren, TUserConnectorProps } from './types';

import { Avatar } from '@components/Avatar';
import { Block } from '@components/Block';
import { Button } from '@components/Button';
import { Drawer } from '@components/Drawer';
import { AuthController } from '@controllers/Auth';
import { UserController } from '@controllers/User';
import iconEdit from '@icons/edit.svg?raw';
import iconLogout from '@icons/logout.svg?raw';
import { Store } from '@modules/Store';
import { connect } from '@modules/Store/utils/connect';
import { deepCompare } from '@utils/deepCompare';
import { uuid } from '@utils/uuid';

import { FormAvatarChange } from '../FormAvatarChange';
import { FormInfoChange } from '../FormInfoChange';
import { FormPasswordChange } from '../FormPasswordChange';
import template from './UserConnector.hbs';
import classNames from './UserConnector.module.scss';

class _UserConnector extends Block<
  HTMLDivElement,
  TUserConnectorProps,
  TUserConnectorChildren
> {
  constructor(props: TUserConnectorProps, options?: TBlockOptions) {
    const { user } = props?.state ?? {};

    super(
      {
        ...props,
        ButtonAvatar: new Button({
          type: 'button',
          isRound: true,
          className: classNames.avatarButton,
          onClick: () => {
            this.children.DrawerAvatarChange.open();
          },
          Children: new Avatar({
            isLarge: true,
            picture: user?.avatar,
          }),
        }),
        FormInfoChange: new FormInfoChange({
          user,
          initialState: {
            first_name: user?.first_name ?? '',
            second_name: user?.second_name ?? '',
            display_name: user?.display_name ?? '',
            login: user?.login ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
          },
          onSubmit: (state) => {
            UserController.changeInfo({
              queryParams: state,
              onBeforeTransaction: () => {
                this.children.FormInfoChange.disable();
                this.children.FormInfoChange.children.ButtonChangeInfo.setProps(
                  {
                    isLoading: true,
                  },
                );
              },
              onAfterTransaction: () => {
                this.children.FormInfoChange.enable();
                this.children.FormInfoChange.children.ButtonChangeInfo.setProps(
                  {
                    isLoading: false,
                  },
                );
              },
              onError: (error) => {
                this.children.FormInfoChange.toggleError(error);
                this.children.FormInfoChange.enable();
                this.children.FormInfoChange.children.ButtonChangeInfo.setProps(
                  {
                    isLoading: false,
                  },
                );
              },
            });
          },
        }),
        ButtonChangePassword: new Button({
          type: 'button',
          onClick: () => {
            this.children.DrawerPasswordChange.open();
          },
          Children: ['Изменить пароль', iconEdit],
        }),
        ButtonLogout: new Button({
          type: 'button',
          isDanger: true,
          Children: ['Выйти', iconLogout],
          onClick: () => {
            AuthController.logout({
              queryParams: undefined,
              onBeforeTransaction: () => {
                this.children.ButtonLogout.setProps({
                  isLoading: true,
                });
              },
              // Оч редкий кейс
              onError: (error) => {
                Store.set('alerts', [
                  ...Store.get('alerts'),
                  {
                    id: uuid(),
                    type: 'error',
                    message: error,
                  },
                ]);

                this.children.ButtonLogout.setProps({
                  isLoading: false,
                });
              },
            });
          },
        }),
        DrawerPasswordChange: new Drawer({
          title: 'Изменение пароля',
          Children: new FormPasswordChange({
            onSubmit: (state) => {
              UserController.changePassword({
                queryParams: state,
                onBeforeTransaction: () => {
                  this.children.DrawerPasswordChange.children.Children.disable();
                  this.children.DrawerPasswordChange.children.Children.children.ButtonChangePassword.setProps(
                    {
                      isLoading: true,
                    },
                  );
                },
                onAfterTransaction: () => {
                  this.children.DrawerPasswordChange.children.Children.enable();
                  this.children.DrawerPasswordChange.children.Children.children.ButtonChangePassword.setProps(
                    {
                      isLoading: false,
                    },
                  );
                },
                onSuccess: () => {
                  this.children.DrawerPasswordChange.close();
                  this.children.DrawerPasswordChange.children.Children?.reset();
                },
                onError: (error) => {
                  this.children.DrawerPasswordChange.children.Children.toggleError(
                    error,
                  );
                  this.children.DrawerPasswordChange.children.Children.enable();
                  this.children.DrawerPasswordChange.children.Children.children.ButtonChangePassword.setProps(
                    {
                      isLoading: false,
                    },
                  );
                },
              });
            },
          }),
        }),
        DrawerAvatarChange: new Drawer({
          title: 'Изменение аватара',
          position: 'bottom',
          Children: new FormAvatarChange({
            onSubmit: (state) => {
              const formData = new FormData();
              formData.append('avatar', state.avatar as File);

              UserController.uploadAvatar({
                queryParams: formData,
                onBeforeTransaction: () => {
                  this.children.DrawerAvatarChange.children.Children.disable();
                  this.children.DrawerAvatarChange.children.Children.children.ButtonChangeAvatar.setProps(
                    {
                      isLoading: true,
                    },
                  );
                },
                onAfterTransaction: () => {
                  this.children.DrawerAvatarChange.children.Children.enable();
                  this.children.DrawerAvatarChange.children.Children.children.ButtonChangeAvatar.setProps(
                    {
                      isLoading: false,
                    },
                  );
                },
                onSuccess: () => {
                  this.children.DrawerAvatarChange.close();
                  this.children.DrawerAvatarChange.children.Children?.reset();
                },
                onError: (error) => {
                  this.children.DrawerAvatarChange.children.Children.toggleError(
                    error,
                  );
                  this.children.DrawerAvatarChange.children.Children.enable();
                  this.children.DrawerAvatarChange.children.Children.children.ButtonChangeAvatar.setProps(
                    {
                      isLoading: false,
                    },
                  );
                },
              });
            },
          }),
        }),
      },
      options,
    );
  }

  componentDidUpdate(
    { state: oldState }: TUserConnectorProps,
    { state: currentState }: TUserConnectorProps,
  ) {
    if (deepCompare(oldState, currentState)) {
      return false;
    }

    const { user: currentUser } = currentState ?? {};

    this.children.FormInfoChange.setProps({
      user: currentUser,
    });

    this.children.ButtonAvatar.children.Children.setProps({
      picture: currentUser?.avatar,
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}

export const UserConnector = connect<HTMLDivElement, TUserConnectorProps>(
  ({ user }) => ({
    state: {
      user,
    },
  }),
)(_UserConnector);

export type UserConnector = InstanceType<typeof UserConnector>;
