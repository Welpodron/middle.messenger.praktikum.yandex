import type { THomeChildren, THomeProps } from './types';

import { Block } from '../../shared/components/Block';

import { Nav } from './components/Nav';

import { PAGE_TITLE, PAGE_DESCRIPTION, NAV_LINKS } from './constants';

import template from './Home.hbs';

export class Home extends Block<THomeProps, THomeChildren> {
  constructor() {
    super({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      Nav: new Nav({
        links: NAV_LINKS,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
