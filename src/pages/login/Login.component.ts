import type { TDynamicObject } from '@app/types/utils';

import type { TLoginChildren } from './types';

import { Block } from '@components/Block';

import { FormLogin } from './components/FormLogin';

import { PAGE_TITLE } from './constants';

import template from './Login.hbs';

export class Login extends Block<HTMLElement, TDynamicObject, TLoginChildren> {
  constructor() {
    super({
      FormLogin: new FormLogin({
        title: PAGE_TITLE,
        onSubmit: async (state) => {
          console.log(state);
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
