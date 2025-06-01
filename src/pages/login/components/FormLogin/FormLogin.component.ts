import type {
  TFormLoginChildren,
  TFormLoginProps,
  TFormLoginState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { Link } from '@components/Link';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconLogin from '@icons/login.svg?raw';

import template from './FormLogin.hbs';

export class FormLogin extends Form<
  TFormLoginState,
  TFormLoginProps,
  TFormLoginChildren
> {
  constructor(props: TFormLoginProps) {
    super({
      ...props,
      FieldLogin: new FormFieldGeneric(
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          placeholder: 'ivanivanov',
          autocomplete: 'username',
          onChange: (event: Event) => {
            this.updateStateFromEvent(event, 'login');
          },
          value: props.initialState?.login,
          validation: COMMON_VALIDATIONS.login,
        },
        {
          displayName: 'FieldLogin',
        },
      ),
      FieldPassword: new FormFieldGeneric(
        {
          label: 'Пароль',
          type: 'password',
          name: 'password',
          placeholder: '**********',
          autocomplete: 'current-password',
          value: props.initialState?.password,
          onChange: (event: Event) => {
            this.updateStateFromEvent(event, 'password');
          },
          validation: COMMON_VALIDATIONS.password,
        },
        {
          displayName: 'FieldPassword',
        },
      ),
      ButtonAuth: new Button(
        {
          type: 'submit',
          isFull: true,
          Children: ['Авторизоваться', iconLogin],
        },
        {
          displayName: 'ButtonAuth',
        },
      ),
      LinkRegister: new Link(
        {
          url: '/sign-up',
          Children: 'Нет аккаунта?',
        },
        {
          displayName: 'LinkRegister',
        },
      ),
    });
  }

  render() {
    return this.compile(template);
  }
}
