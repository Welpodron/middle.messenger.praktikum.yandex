import { Validatable } from '../Validatable';
import { Input } from '../Input';

import template from './FormFieldGeneric.hbs';

import type { TFormFieldProps } from './types';

export class FormFieldGeneric<TValue = string> extends Validatable<
  TValue,
  Input,
  HTMLLabelElement,
  TFormFieldProps<TValue>
> {
  constructor(props: TFormFieldProps<TValue>) {
    super({
      ...props,
      Input: new Input({
        onBlur: () => {
          this.validate();
        },
        ...props,
        className: props.inputClassName,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
