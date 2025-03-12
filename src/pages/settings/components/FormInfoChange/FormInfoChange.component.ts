import type {
  TFormInfoChangeChildren,
  TFormInfoChangeState,
  TFormInfoChangeProps,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { Button } from '@components/Button';
import { Avatar } from '@components/Avatar';

import classNames from './FormInfoChange.module.scss';

import template from './FormInfoChange.hbs';

export class FormInfoChange extends Form<
  TFormInfoChangeState,
  TFormInfoChangeProps,
  TFormInfoChangeChildren
> {
  constructor(props: TFormInfoChangeProps) {
    super({
      ...props,
      ButtonAvatar: new Button({
        type: 'button',
        isRound: true,
        className: classNames.avatarButton,
        onClick: props.onAvatarChangeClick,
        Children: new Avatar({
          isLarge: true,
          picture: props.currentUser.picture,
        }),
      }),
      FieldEmail: new FormFieldGeneric({
        label: 'Почта',
        name: 'email',
        type: 'email',
        placeholder: 'pochta@yandex.ru',
        autocomplete: 'email',
        value: props.initialState?.email,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'email');
        },
        validation: COMMON_VALIDATIONS.email,
      }),
      FieldLogin: new FormFieldGeneric({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
        value: props.initialState?.login,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'login');
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      FieldFirstName: new FormFieldGeneric({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'given-name',
        value: props.initialState?.first_name,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'first_name');
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      FieldSecondName: new FormFieldGeneric({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Иванов',
        autocomplete: 'family-name',
        value: props.initialState?.second_name,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'second_name');
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      FieldDisplayName: new FormFieldGeneric({
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'username',
        value: props.initialState?.display_name,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'display_name');
        },
      }),
      FieldPhone: new FormFieldGeneric({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: '+7 (909) 967 30 30',
        autocomplete: 'tel',
        value: props.initialState?.phone,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'phone');
        },
        validation: COMMON_VALIDATIONS.phone,
      }),
      ButtonChangeData: new Button({
        type: 'submit',
        Children: 'Изменить данные',
      }),
      ButtonChangePassword: new Button({
        type: 'button',
        onClick: props.onPasswordChangeClick,
        Children: 'Изменить пароль',
      }),
      ButtonLogout: new Button({
        type: 'button',
        isDanger: true,
        Children: 'Выйти',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
