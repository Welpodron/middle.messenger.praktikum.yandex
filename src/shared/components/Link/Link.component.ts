import { Block } from '../Block';

import type { TLinkChildren, TLinkProps } from './types';

import template from './Link.hbs';

export class Link extends Block<HTMLAnchorElement, TLinkProps, TLinkChildren> {
  constructor(props: TLinkProps & TLinkChildren) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
