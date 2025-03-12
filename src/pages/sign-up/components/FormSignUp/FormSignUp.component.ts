import type {
  TFormSignUpChildren,
  TFormSignUpProps,
  TFormSignUpState,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { FormFieldGeneric } from '@components/FormFieldGeneric';

import template from './FormSignUp.hbs';

export class FormSignUp extends Form<
  TFormSignUpState,
  TFormSignUpProps,
  TFormSignUpChildren
> {
  constructor(props: TFormSignUpProps) {
    super({
      ...props,
      FieldEmail: new FormFieldGeneric({
        label: 'Почта',
        name: 'email',
        type: 'email',
        placeholder: 'pochta@yandex.ru',
        autocomplete: 'email',
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
        onChange: (event) => {
          this.updateStateFromEvent(event, 'second_name');
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      FieldPhone: new FormFieldGeneric({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: '+7 (909) 967 30 30',
        autocomplete: 'tel',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'phone');
        },
        validation: COMMON_VALIDATIONS.phone,
      }),
      FieldPassword: new FormFieldGeneric({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'password');
        },
        validation: COMMON_VALIDATIONS.password,
      }),
      FieldPasswordRepeated: new FormFieldGeneric({
        label: 'Пароль (ещё раз)',
        type: 'password',
        name: 'password_repeated',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'password_repeated');
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
