import type {
  TFormSignUpChildren,
  TFormSignUpProps,
  TFormSignUpState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { Link } from '@components/Link';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconLogin from '@icons/login.svg?raw';

import template from './FormSignUp.hbs';

export class FormSignUp extends Form<
  TFormSignUpState,
  TFormSignUpProps,
  TFormSignUpChildren
> {
  constructor(props: TFormSignUpProps) {
    super({
      ...props,
      FieldEmail: new FormFieldGeneric(
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          placeholder: 'pochta@yandex.ru',
          autocomplete: 'email',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'email');
          },
          validation: COMMON_VALIDATIONS.email,
        },
        {
          displayName: 'FieldEmail',
        },
      ),
      FieldLogin: new FormFieldGeneric(
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          placeholder: 'ivanivanov',
          autocomplete: 'username',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'login');
          },
          validation: COMMON_VALIDATIONS.login,
        },
        {
          displayName: 'FieldLogin',
        },
      ),
      FieldFirstName: new FormFieldGeneric(
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          placeholder: 'Иван',
          autocomplete: 'given-name',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'first_name');
          },
          validation: COMMON_VALIDATIONS.names,
        },
        {
          displayName: 'FieldFirstName',
        },
      ),
      FieldSecondName: new FormFieldGeneric(
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          placeholder: 'Иванов',
          autocomplete: 'family-name',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'second_name');
          },
          validation: COMMON_VALIDATIONS.names,
        },
        {
          displayName: 'FieldSecondName',
        },
      ),
      FieldPhone: new FormFieldGeneric(
        {
          label: 'Телефон',
          name: 'phone',
          type: 'text',
          placeholder: '+7 (909) 967 30 30',
          autocomplete: 'tel',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'phone');
          },
          validation: COMMON_VALIDATIONS.phone,
        },
        {
          displayName: 'FieldPhone',
        },
      ),
      FieldPassword: new FormFieldGeneric(
        {
          label: 'Пароль',
          type: 'password',
          name: 'password',
          placeholder: '**********',
          autocomplete: 'new-password',
          onChange: (event) => {
            this.updateStateFromEvent(event, 'password');
          },
          validation: COMMON_VALIDATIONS.password,
        },
        {
          displayName: 'FieldPassword',
        },
      ),
      ButtonRegister: new Button(
        {
          type: 'submit',
          isFull: true,
          Children: ['Зарегистрироваться', iconLogin],
        },
        {
          displayName: 'ButtonRegister',
        },
      ),
      LinkLogin: new Link(
        {
          url: '/login',
          Children: 'Войти',
        },
        {
          displayName: 'LinkLogin',
        },
      ),
    });
  }

  render() {
    return this.compile(template);
  }
}
