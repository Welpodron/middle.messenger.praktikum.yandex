import type { TInputProps } from './types';

import { Inputable } from '../Inputable';

import template from './Input.hbs';

export class Input<TValue = string> extends Inputable<
  TValue,
  HTMLInputElement,
  TInputProps
> {
  constructor(props: TInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange,
        input: props.onInput,
      },
    });
  }

  get value() {
    return this.getContent()?.value as TValue;
  }

  render() {
    return this.compile(template);
  }
}
