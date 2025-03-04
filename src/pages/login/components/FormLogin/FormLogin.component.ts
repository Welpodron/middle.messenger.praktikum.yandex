import type {
  TFormLoginChildren,
  TFormLoginProps,
  TFormLoginState,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { Button } from '../../../../shared/components/Button';
import { Link } from '../../../../shared/components/Link';
import { FormField } from '../../../../shared/components/FormField';

import template from './FormLogin.hbs';

export class FormLogin extends Form<
  TFormLoginState,
  TFormLoginProps,
  TFormLoginChildren
> {
  constructor(props: TFormLoginProps) {
    super({
      ...props,
      InputLogin: new FormField({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
        // TODO: По факту одно и тоже что и поля ниже - вынести в отдельный метод
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            login: value,
          });
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      InputPassword: new FormField({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'current-password',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            password: value,
          });
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
