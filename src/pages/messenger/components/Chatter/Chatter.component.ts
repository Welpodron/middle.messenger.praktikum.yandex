import type { TChatterProps, TChatterChildren } from './types';

import { Block } from '../../../../shared/components/Block';

import template from './Chatter.hbs';

export class Chatter extends Block<TChatterProps, TChatterChildren> {
  constructor() {
    super();
  }

  render() {
    return this.compile(template);
  }
}
