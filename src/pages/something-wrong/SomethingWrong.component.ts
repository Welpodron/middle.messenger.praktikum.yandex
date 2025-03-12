import type { TDynamicObject } from '../../shared/types/utils';

import type { TSomethingWrongChildren } from './types';

import { Block } from '../../shared/components/Block';
import { ErrorSplash } from '../../shared/components/ErrorSplash';

import { PAGE_TITLE, PAGE_DESCRIPTION } from './constants';

import template from './SomethingWrong.hbs';

export class SomethingWrong extends Block<TDynamicObject, TSomethingWrongChildren> {
  constructor() {
    super({
      ErrorSplash: new ErrorSplash({
        title: PAGE_TITLE,
        message: PAGE_DESCRIPTION,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
