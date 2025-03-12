import { Block } from '../../../Block';

import template from './Placeholder.hbs';

import type { TPlaceholderProps } from './types';

export class Placeholder extends Block<HTMLSpanElement, TPlaceholderProps> {
  constructor(props: TPlaceholderProps) {
    super(props);
  }

  componentDidUpdate(
    oldProps: Partial<TPlaceholderProps>,
    newProps: Partial<TPlaceholderProps>,
  ) {
    if (oldProps.placeholder === newProps.placeholder) {
      return false;
    }

    return true;
  }

  hide() {
    this.getContent()?.setAttribute('hidden', '');
  }

  show() {
    this.getContent()?.removeAttribute('hidden');
  }

  render() {
    return this.compile(template);
  }
}
