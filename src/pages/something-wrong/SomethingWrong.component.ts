import type { TDynamicObject } from '@app/types/utils';
import type { TSomethingWrongChildren } from './types';

import { ErrorSplash } from '@components/ErrorSplash';
import { Page } from '@components/Page';

import { PAGE_DESCRIPTION, PAGE_TITLE } from './constants';
import template from './SomethingWrong.hbs';

export class SomethingWrong extends Page<HTMLElement, TDynamicObject, TSomethingWrongChildren> {
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
