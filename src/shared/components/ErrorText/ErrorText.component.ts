import { Block } from '../Block';

import template from './ErrorText.hbs';

import type { TErrorTextProps } from './types';

export class ErrorText extends Block<TErrorTextProps> {
  constructor(props: TErrorTextProps) {
    super(props);
  }

  componentDidUpdate(oldProps: Partial<TErrorTextProps>, newProps: Partial<TErrorTextProps>) {
    if (oldProps?.error === newProps?.error) {
      return false;
    }

    return true;
  }

  render() {
    return this.compile(template);
  }
}
