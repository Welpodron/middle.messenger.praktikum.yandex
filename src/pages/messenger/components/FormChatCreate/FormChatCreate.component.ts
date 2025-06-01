import type {
  TFormChatCreateChildren,
  TFormChatCreateProps,
  TFormChatCreateState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconPlus from '@icons/plus.svg?raw';

import template from './FormChatCreate.hbs';
import classNames from './FormChatCreate.module.scss';

export class FormChatCreate extends Form<
  TFormChatCreateState,
  TFormChatCreateProps,
  TFormChatCreateChildren
> {
  constructor(props: TFormChatCreateProps) {
    super({
      ...props,
      FieldTitle: new FormFieldGeneric({
        labelClassName: 'sr-only',
        label: 'Название чата',
        name: 'title',
        type: 'text',
        placeholder: 'Введите название чата',
        autocomplete: 'off',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'title');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonCreate: new Button({
        type: 'submit',
        isFull: true,
        Children: ['Создать чат', iconPlus],
        className: classNames.button,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
