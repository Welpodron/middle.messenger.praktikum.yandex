import type {
  TFormFieldMessageProps,
  TFormFieldMessageChildren,
} from './types';

import { Validatable } from '../Validatable';
import { InputMessage } from '../InputMessage';
import { Placeholder } from './components/Placeholder';

import template from './FormFieldMessage.hbs';

export class FormFieldMessage<TValue = string> extends Validatable<
  TValue,
  InputMessage,
  HTMLLabelElement,
  TFormFieldMessageProps<TValue>,
  TFormFieldMessageChildren
> {
  constructor(props: TFormFieldMessageProps<TValue>) {
    super({
      ...props,
      Placeholder: new Placeholder({
        placeholder: props.placeholder,
      }),
      Input: new InputMessage({
        ...props,
        onBlur: (event) => {
          this.validate();

          this.props.onBlur?.(event);
        },
        onInput: (event) => {
          if ((event.target as HTMLElement)?.textContent) {
            this.children.Placeholder.hide();
          }
          else {
            this.children.Placeholder.show();
          }

          this.props.onInput?.(event);
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
