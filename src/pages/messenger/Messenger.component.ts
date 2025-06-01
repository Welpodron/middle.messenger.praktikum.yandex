import type { TMessengerChildren, TMessengerProps } from './types';

import { Page } from '@components/Page';

import { ChatterConnector } from './components/ChatterConnector';
import { Sidebar } from './components/Sidebar';
import { PAGE_TITLE } from './constants';
import template from './Messenger.hbs';

export class Messenger extends Page<
  HTMLDivElement,
  TMessengerProps,
  TMessengerChildren
> {
  constructor() {
    super({
      title: PAGE_TITLE,
      Sidebar: new Sidebar(),
      ChatterConnector: new ChatterConnector(undefined, {
        displayName: 'ChatterConnector',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
