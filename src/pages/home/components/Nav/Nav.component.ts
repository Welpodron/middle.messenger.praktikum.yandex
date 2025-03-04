import type { TNavChildren, TNavProps } from './types';

import { Block } from '../../../../shared/components/Block';
import { Link } from '../../../../shared/components/Link';

import template from './Nav.hbs';

export class Nav extends Block<TNavProps, TNavChildren> {
  constructor(props: TNavProps) {
    super({
      ...props,
      Links: props.links.map(({ url, text }) => new Link({ url, Children: text })),
    });
  }

  render() {
    return this.compile(template);
  }
}
