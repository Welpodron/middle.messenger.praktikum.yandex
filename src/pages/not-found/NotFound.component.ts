import type { TDynamicObject } from '@app/types/utils';

import type { TNotFoundChildren } from './types';

import { Block } from '@components/Block';
import { ErrorSplash } from '@components/ErrorSplash';

import { PAGE_TITLE, PAGE_DESCRIPTION } from './constants';

import template from './NotFound.hbs';

// TODO: Сейчас NotFound === SomethingWentWrong, мб нужно будет объединить в один компонент когда станет понятно как сделать роутер
export class NotFound extends Block<HTMLElement, TDynamicObject, TNotFoundChildren> {
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
