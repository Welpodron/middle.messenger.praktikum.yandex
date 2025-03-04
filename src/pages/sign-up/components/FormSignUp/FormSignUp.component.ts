import type {
  TFormSignUpChildren,
  TFormSignUpProps,
  TFormSignUpState,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { Button } from '../../../../shared/components/Button';
import { Link } from '../../../../shared/components/Link';
import { FormField } from '../../../../shared/components/FormField';

import template from './FormSignUp.hbs';

export class FormSignUp extends Form<
  TFormSignUpState,
  TFormSignUpProps,
  TFormSignUpChildren
> {
  constructor(props: TFormSignUpProps) {
    super({
      ...props,
      InputEmail: new FormField({
        label: 'Почта',
        name: 'email',
        type: 'email',
        placeholder: 'pochta@yandex.ru',
        autocomplete: 'email',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            email: value,
          });
        },
        validation: COMMON_VALIDATIONS.email,
      }),
      InputLogin: new FormField({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
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
      InputFirstName: new FormField({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'given-name',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            first_name: value,
          });
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      InputSecondName: new FormField({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Иванов',
        autocomplete: 'family-name',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            second_name: value,
          });
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      InputPhone: new FormField({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: '+7 (909) 967 30 30',
        autocomplete: 'tel',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            phone: value,
          });
        },
        validation: COMMON_VALIDATIONS.phone,
      }),
      InputPassword: new FormField({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'new-password',
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
      InputPasswordRepeated: new FormField({
        label: 'Пароль (ещё раз)',
        type: 'password',
        name: 'password_repeated',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            password_repeated: value,
          });
        },
        validation: {
          test: (value: string) => value === this.state.password,
          message: 'Пароли не совпадают',
        },
      }),
      ButtonRegister: new Button({
        type: 'submit',
        isFull: true,
        Children: 'Зарегистрироваться',
      }),
      LinkLogin: new Link({
        url: '/login',
        Children: 'Войти',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
