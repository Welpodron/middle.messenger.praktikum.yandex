import type { TBlockOptions } from '../Block';
import type { TErrorTextProps } from './types';

import { Block } from '../Block';
import template from './ErrorText.hbs';

export class ErrorText extends Block<HTMLSpanElement, TErrorTextProps> {
  constructor(props: TErrorTextProps, options?: TBlockOptions) {
    super(props, options);
  }

  render() {
    return this.compile(template);
  }
}
