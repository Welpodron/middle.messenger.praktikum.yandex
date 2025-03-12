import type { TChatterProps, TChatterChildren } from './types';

import { Block } from '@components/Block';

import template from './Chatter.hbs';

export class Chatter extends Block<HTMLElement, TChatterProps, TChatterChildren> {
  constructor() {
    super();
  }

  render() {
    return this.compile(template);
  }
}
