import type { TBlockOptions } from '@components/Block';
import type { TInputProps } from './types';

import { Inputable } from '../Inputable';
import template from './Input.hbs';

export class Input<TValue = string> extends Inputable<
  TValue,
  HTMLInputElement,
  TInputProps
> {
  constructor(props: TInputProps, options?: TBlockOptions) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange,
        input: props.onInput,
      },
    }, options);
  }

  reset() {
    const element = this.getContent();

    if (!element) {
      return;
    }

    element.value = this._props.value ?? '';
  }

  get value() {
    return this.getContent()?.value as TValue;
  }

  render() {
    return this.compile(template);
  }
}
