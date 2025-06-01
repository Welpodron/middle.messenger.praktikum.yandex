import type { TNavChildren, TNavProps } from './types';

import { Block } from '@components/Block';
import { Link } from '@components/Link';

import template from './Nav.hbs';

export class Nav extends Block<HTMLElement, TNavProps, TNavChildren> {
  constructor(props: TNavProps) {
    super({
      ...props,
      Links: props.links.map(
        ({ url, text }) =>
          new Link({ url, Children: text }),
      ),
    });
  }

  render() {
    return this.compile(template);
  }
}
