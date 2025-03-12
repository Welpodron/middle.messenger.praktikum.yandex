import type {
  TFormMessageChildren,
  TFormMessageProps,
  TFormMessageState,
} from './types';

import { COMMON_VALIDATIONS } from '@constants/validation';

import { Form } from '@components/Form';
import { Button } from '@components/Button';
import { FormFieldMessage } from '@components/FormFieldMessage';

import sendIcon from '@icons/send.svg?raw';

import classNames from './FormMessage.module.scss';

import template from './FormMessage.hbs';

export class FormMessage extends Form<
  TFormMessageState,
  TFormMessageProps,
  TFormMessageChildren
> {
  constructor(props: TFormMessageProps) {
    super({
      ...props,
      InputMessage: new FormFieldMessage({
        placeholder: 'Сообщение...',
        onInput: (event) => {
          const target = event.target as HTMLSpanElement;

          this.updateState(target.textContent ?? '', 'message');
        },
        onEnter: async () => {
          this.getContent()?.dispatchEvent(new Event('submit'));
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonSend: new Button({
        type: 'submit',
        className: classNames.button,
        Children: sendIcon,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
