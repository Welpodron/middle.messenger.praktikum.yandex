import { Block } from '../Block';
import { Input } from '../Input';

import template from './InputSearch.hbs';

import classNames from './InputSearch.module.scss';

import type { TInputSearchProps, TInputSearchChildren } from './types';

export class InputSearch extends Block<HTMLLabelElement, TInputSearchProps, TInputSearchChildren> {
  constructor(props: TInputSearchProps) {
    super({
      ...props,
      Input: new Input({
        ...props,
        type: 'search',
        autocomplete: 'off',
        className: classNames.input,
      }),
    });
  }

  get value() {
    return this.children.Input.value;
  }

  render() {
    return this.compile(template);
  }
}
