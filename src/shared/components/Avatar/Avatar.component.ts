import type { TAvatarProps } from './types';

import { Block } from '../Block';

import template from './Avatar.hbs';

export class Avatar extends Block<TAvatarProps> {
  constructor(props: TAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
