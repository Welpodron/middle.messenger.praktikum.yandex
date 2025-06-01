import type { TBlockOptions } from '../Block';
import type { TAvatarProps } from './types';

import { Block } from '../Block';
import template from './Avatar.hbs';

export class Avatar extends Block<HTMLSpanElement, TAvatarProps> {
  constructor(props: TAvatarProps, options?: TBlockOptions) {
    super(props, options);
  }

  render() {
    return this.compile(template);
  }
}
