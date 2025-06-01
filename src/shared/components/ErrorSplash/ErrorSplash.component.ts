import type { TErrorSplashChildren, TErrorSplashProps } from './types';

import { Block } from '../Block';
import { Link } from '../Link';
import template from './ErrorSplash.hbs';

export class ErrorSplash extends Block<HTMLDivElement, TErrorSplashProps, TErrorSplashChildren> {
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
