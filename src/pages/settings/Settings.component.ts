import type { TSettingsProps, TSettingsChildren } from './types';

import { Block } from '../../shared/components/Block';
import { Link } from '../../shared/components/Link';
import { FormInfoChange } from './components/FormInfoChange';

import { Dialog } from '../../shared/components/Dialog';
import { FormPasswordChange } from './components/FormPasswordChange';
import { FormAvatarChange } from './components/FormAvatarChange';

import classNames from './Settings.module.scss';

import chevronLeftIcon from '../../shared/icons/chevron-left.svg?raw';

import { PAGE_TITLE } from './constants';

import template from './Settings.hbs';

export class Settings extends Block<TSettingsProps, TSettingsChildren> {
  constructor(props: Omit<TSettingsProps, 'title'>) {
    super({
      ...props,
      title: PAGE_TITLE,
      LinkBack: new Link({
        url: '/messenger',
        className: classNames.linkBack,
        Children: chevronLeftIcon,
      }),
      FormInfoChange: new FormInfoChange({
        currentUser: props.currentUser,
        initialState: {
          email: props.currentUser.email,
          login: props.currentUser.login,
          first_name: props.currentUser.first_name,
          second_name: props.currentUser.second_name,
          display_name: props.currentUser.display_name ?? '',
          phone: props.currentUser.phone,
        },
        onSubmit: async (state) => {
          console.log(state);
        },
        onPasswordChangeClick: () => {
          this.children.DialogPasswordChange.show();
        },
        onAvatarChangeClick: () => {
          this.children.DialogAvatarChange.show();
        },
      }),
      DialogAvatarChange: new Dialog({
        title: 'Изменение аватара',
        Children: new FormAvatarChange({
          initialState: {
            avatar: null,
          },
          onSubmit: async (state) => {
            console.log(state);
          },
        }),
      }),
      DialogPasswordChange: new Dialog({
        title: 'Изменение пароля',
        Children: new FormPasswordChange({
          initialState: {
            password: '',
            new_password: '',
            new_password_repeated: '',
          },
          onSubmit: async (state) => {
            console.log(state);
          },
        }),
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
