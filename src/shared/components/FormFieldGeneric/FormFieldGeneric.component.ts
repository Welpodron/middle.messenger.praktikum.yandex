import type { TBlockOptions } from '@components/Block';
import type { TFormFieldProps } from './types';

import { deepCompare } from '@utils/deepCompare';

import { Input } from '../Input';
import { Validatable } from '../Validatable';
import template from './FormFieldGeneric.hbs';

export class FormFieldGeneric<TValue = string> extends Validatable<
  TValue,
  Input,
  HTMLLabelElement,
  TFormFieldProps<TValue>
> {
  constructor(props: TFormFieldProps<TValue>, options?: TBlockOptions) {
    super({
      ...props,
      Input: new Input({
        onBlur: () => {
          this.validate();
        },
        ...props,
        className: props.inputClassName,
      }, options?.displayName ? { displayName: `${options.displayName}Input` } : undefined),
    }, options);
  }

  componentDidUpdate(oldProps: TFormFieldProps<TValue>, currentProps: TFormFieldProps<TValue>) {
    if (deepCompare(oldProps, currentProps)) {
      return false;
    }

    this.children.Input.setProps({
      value: currentProps.value,
      placeholder: currentProps.placeholder,
      className: currentProps.inputClassName,
      type: currentProps.type,
      name: currentProps.name,
      autocomplete: currentProps.autocomplete,
      isRequired: currentProps.isRequired,
      isDisabled: currentProps.isDisabled,
      isReadonly: currentProps.isReadonly,
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}
