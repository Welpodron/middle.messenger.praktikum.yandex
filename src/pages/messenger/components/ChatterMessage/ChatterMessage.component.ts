import type { TChatterMessageProps } from './types';

import { Block } from '@components/Block';

import template from './ChatterMessage.hbs';

export class ChatterMessage extends Block<HTMLDivElement, TChatterMessageProps> {
  constructor(props: TChatterMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
