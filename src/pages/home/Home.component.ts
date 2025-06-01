import type { THomeChildren, THomeProps } from './types';

import { Page } from '@components/Page';

import { Nav } from './components/Nav';
import { NAV_LINKS, PAGE_DESCRIPTION, PAGE_TITLE } from './constants';
import template from './Home.hbs';

export class Home extends Page<HTMLElement, THomeProps, THomeChildren> {
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
