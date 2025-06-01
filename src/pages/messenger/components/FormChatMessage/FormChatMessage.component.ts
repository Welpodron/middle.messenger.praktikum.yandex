import type {
  TFormChatMessageChildren,
  TFormChatMessageProps,
  TFormChatMessageState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconSend from '@icons/send.svg?raw';

import template from './FormChatMessage.hbs';
import classNames from './FormChatMessage.module.scss';

export class FormChatMessage extends Form<
  TFormChatMessageState,
  TFormChatMessageProps,
  TFormChatMessageChildren
> {
  constructor(props: TFormChatMessageProps) {
    super({
      ...props,
      FieldTitle: new FormFieldGeneric({
        labelClassName: 'sr-only',
        label: 'Сообщение...',
        name: 'message',
        type: 'text',
        placeholder: 'Введите сообщение...',
        autocomplete: 'off',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'message');
        },
        onBlur: undefined,
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonSend: new Button({
        type: 'submit',
        isSquare: true,
        Children: iconSend,
        className: classNames.button,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
