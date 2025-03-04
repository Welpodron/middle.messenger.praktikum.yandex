import type {
  TFormMessageChildren,
  TFormMessageProps,
  TFormMessageState,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { Button } from '../../../../shared/components/Button';
import { FormField } from '../../../../shared/components/FormField';

import sendIcon from '../../../../shared/icons/send.svg?raw';

import classNames from './FormMessage.module.scss';

import template from './FormMessage.hbs';
;

export class FormMessage extends Form<
  TFormMessageState,
  TFormMessageProps,
  TFormMessageChildren
> {
  constructor(props: TFormMessageProps) {
    super({
      ...props,
      InputMessage: new FormField({
        labelClassName: 'sr-only',
        className: classNames.field,
        inputClassName: classNames.input,
        label: 'Сообщение',
        name: 'message',
        type: 'text',
        placeholder: 'Сообщение',
        autocomplete: 'off',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            message: value,
          });
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
