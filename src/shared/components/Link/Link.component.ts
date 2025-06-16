import type { TBlockChildrenTypes, TBlockOptions } from '../Block';
import type { TLinkChildren, TLinkProps } from './types';

import { Router } from '@modules/Router';

import { Block } from '../Block';
import template from './Link.hbs';

export class Link<TChildren extends TBlockChildrenTypes> extends Block<
  HTMLAnchorElement,
  TLinkProps,
  TLinkChildren<TChildren>
> {
  constructor(
    props: TLinkProps & { Children: TChildren },
    options?: TBlockOptions,
  ) {
    super(
      {
        ...props,
        events: {
          click: (event) => {
            event.preventDefault();

            Router.go(this._props.url);
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
