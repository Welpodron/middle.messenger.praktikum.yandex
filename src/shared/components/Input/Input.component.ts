import { Block } from '../Block';

import template from './Input.hbs';

import type { TInputProps } from './types';

export class Input extends Block<TInputProps> {
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
    return (this.getContent() as HTMLInputElement)?.value;
  }

  render() {
    return this.compile(template);
  }
}
