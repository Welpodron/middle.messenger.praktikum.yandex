import type {
  TFormChatCreateChildren,
  TFormChatCreateProps,
  TFormChatCreateState,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { Button } from '@components/Button';
import { FormFieldGeneric } from '@components/FormFieldGeneric';

import classNames from './FormChatCreate.module.scss';

import template from './FormChatCreate.hbs';

export class FormChatCreate extends Form<
  TFormChatCreateState,
  TFormChatCreateProps,
  TFormChatCreateChildren
> {
  constructor(props: TFormChatCreateProps) {
    super({
      ...props,
      FieldLogin: new FormFieldGeneric({
        labelClassName: 'sr-only',
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        autocomplete: 'off',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'login');
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      ButtonCreate: new Button({
        type: 'submit',
        isFull: true,
        className: classNames.button,
        Children: 'Создать',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
