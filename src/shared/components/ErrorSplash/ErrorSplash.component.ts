import { Block } from '../Block';
import { Link } from '../Link';

import template from './ErrorSplash.hbs';

import type { TErrorSplashProps, TErrorSplashChildren } from './types';

export class ErrorSplash extends Block<TErrorSplashProps, TErrorSplashChildren> {
  constructor(props: TErrorSplashProps) {
    super({
      ...props,
      LinkBack: new Link({
        url: '/messenger',
        Children: 'Назад к чатам',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
