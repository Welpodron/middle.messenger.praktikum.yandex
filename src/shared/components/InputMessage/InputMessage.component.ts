import type { TInputMessageProps } from './types';

import { Inputable } from '../Inputable';

import template from './InputMessage.hbs';

export class InputMessage<TValue = string> extends Inputable<
  TValue,
  HTMLSpanElement,
  TInputMessageProps
> {
  constructor(props: TInputMessageProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        keydown: (event: KeyboardEvent) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            this.props.onEnter?.(event);
          }
        },
        input: props.onInput,
      },
    });
  }

  get value() {
    return this.getContent()?.textContent as TValue;
  }

  render() {
    return this.compile(template);
  }
}
