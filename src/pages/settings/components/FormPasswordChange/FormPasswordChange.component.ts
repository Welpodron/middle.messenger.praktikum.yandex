import type {
  TFormPasswordChangeChildren,
  TFormPasswordChangeProps,
  TFormPasswordChangeState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconEdit from '@icons/edit.svg?raw';

import template from './FormPasswordChange.hbs';

export class FormPasswordChange extends Form<
  TFormPasswordChangeState,
  TFormPasswordChangeProps,
  TFormPasswordChangeChildren
> {
  constructor(props: TFormPasswordChangeProps) {
    super({
      ...props,
      FieldOldPassword: new FormFieldGeneric({
        label: 'Текущий пароль',
        type: 'password',
        name: 'oldPassword',
        placeholder: '**********',
        autocomplete: 'off',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'oldPassword');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      FieldNewPassword: new FormFieldGeneric({
        label: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'newPassword');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonChangePassword: new Button({
        type: 'submit',
        isDanger: true,
        isFull: true,
        Children: ['Сменить пароль', iconEdit],
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
