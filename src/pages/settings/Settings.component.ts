import type { TSettingsChildren, TSettingsProps } from './types';

import { Link } from '@components/Link';
import { Page } from '@components/Page';
import iconChevronLeft from '@icons/chevron-left.svg?raw';

import { UserConnector } from './components/UserConnector';
import { PAGE_TITLE } from './constants';
import template from './Settings.hbs';
import classNames from './Settings.module.scss';

export class Settings extends Page<
  HTMLDivElement,
  TSettingsProps,
  TSettingsChildren
> {
  constructor() {
    super({
      title: PAGE_TITLE,
      LinkBack: new Link({
        url: '/messenger',
        className: classNames.linkBack,
        Children: iconChevronLeft,
      }),
      UserConnector: new UserConnector(undefined, {
        displayName: 'UserConnector',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
