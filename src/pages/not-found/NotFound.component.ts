import type { TDynamicObject } from '@app/types/utils';
import type { TNotFoundChildren } from './types';

import { ErrorSplash } from '@components/ErrorSplash';
import { Page } from '@components/Page';

import { PAGE_DESCRIPTION, PAGE_TITLE } from './constants';
import template from './NotFound.hbs';
// TODO: Сейчас NotFound === SomethingWentWrong, мб нужно будет объединить в один компонент
export class NotFound extends Page<HTMLElement, TDynamicObject, TNotFoundChildren> {
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
