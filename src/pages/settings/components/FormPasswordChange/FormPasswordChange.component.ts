import type {
  TFormPasswordChangeChildren,
  TFormPasswordChangeState,
  TFormPasswordChangeProps,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { Button } from '@components/Button';

import template from './FormPasswordChange.hbs';

export class FormPasswordChange extends Form<
  TFormPasswordChangeState,
  TFormPasswordChangeProps,
  TFormPasswordChangeChildren
> {
  constructor(props: TFormPasswordChangeProps) {
    super({
      ...props,
      FieldPassword: new FormFieldGeneric({
        label: 'Текущий пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'current-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'password');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      FieldNewPassword: new FormFieldGeneric({
        label: 'Новый пароль',
        type: 'password',
        name: 'new_password',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'new_password');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      FieldNewPasswordRepeated: new FormFieldGeneric({
        label: 'Повторите новый пароль',
        type: 'password',
        name: 'new_password_repeated',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'new_password_repeated');
        },
        validation: {
          test: value => value === this.state.new_password,
          message: 'Пароли не совпадают',
        },
      }),
      ButtonChangePassword: new Button({
        type: 'submit',
        isDanger: true,
        isFull: true,
        Children: 'Сменить пароль',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
