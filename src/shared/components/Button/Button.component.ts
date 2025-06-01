import type { TBlockChildrenTypes, TBlockOptions } from '../Block';
import type { TButtonChildren, TButtonProps } from './types';

import { Block } from '../Block';
import template from './Button.hbs';

export class Button<TChildren extends TBlockChildrenTypes> extends Block<
  HTMLButtonElement,
  TButtonProps,
  TButtonChildren<TChildren>
> {
  constructor(
    props: TButtonProps & { Children: TChildren },
    options?: TBlockOptions,
  ) {
    super(
      {
        ...props,
        events: {
          click: (event: MouseEvent) => {
            props.onClick?.(event);
          },
        },
      },
      options,
    );
  }

  render() {
    return this.compile(template);
  }
}
