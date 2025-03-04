import { Block } from '../Block';
import { ErrorText } from '../ErrorText';
import { Input } from '../Input';

import template from './FormField.hbs';

import type { TFormFieldProps, TFormFieldChildren } from './types';

export class FormField extends Block<TFormFieldProps, TFormFieldChildren> {
  constructor(props: TFormFieldProps) {
    super({
      ...props,
      Input: new Input({
        onBlur: () => {
          this.validate();
        },
        ...props,
        className: props.inputClassName,
      }),
      ErrorText: new ErrorText({
        error: props.error,
      }),
    });
  }

  validate() {
    if (!this.props.validation) {
      return true;
    }

    const { test, message } = this.props.validation;

    if (!test(this.children.Input.value)) {
      this.children.ErrorText.setProps({
        error: message,
      });

      return false;
    }

    this.children.ErrorText.setProps({
      error: undefined,
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}
