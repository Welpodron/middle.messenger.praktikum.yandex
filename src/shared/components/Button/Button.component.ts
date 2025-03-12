import { Block } from '../Block';

import type { TButtonChildren, TButtonProps } from './types';

import template from './Button.hbs';

export class Button extends Block<HTMLButtonElement, TButtonProps, TButtonChildren> {
  constructor(props: TButtonProps & TButtonChildren) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
