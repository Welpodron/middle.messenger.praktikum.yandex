import type {
  TFormLoginChildren,
  TFormLoginProps,
  TFormLoginState,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { FormFieldGeneric } from '@components/FormFieldGeneric';

import template from './FormLogin.hbs';

export class FormLogin extends Form<
  TFormLoginState,
  TFormLoginProps,
  TFormLoginChildren
> {
  constructor(props: TFormLoginProps) {
    super({
      ...props,
      FieldLogin: new FormFieldGeneric({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
        onChange: (event: Event) => {
          this.updateStateFromEvent(event, 'login');
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      FieldPassword: new FormFieldGeneric({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'current-password',
        onChange: (event: Event) => {
          this.updateStateFromEvent(event, 'password');
        },
        validation: COMMON_VALIDATIONS.password,
      }),
      ButtonAuth: new Button({
        type: 'submit',
        isFull: true,
        Children: 'Авторизоваться',
      }),
      LinkRegister: new Link({
        url: '/sign-up',
        Children: 'Нет аккаунта?',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
