import type { TDynamicObject } from '../../shared/types/utils';

import type { TLoginChildren } from './types';

import { Block } from '../../shared/components/Block';

import { FormLogin } from './components/FormLogin';

import { PAGE_TITLE } from './constants';

import template from './Login.hbs';

export class Login extends Block<TDynamicObject, TLoginChildren> {
  constructor() {
    super({
      FormLogin: new FormLogin({
        title: PAGE_TITLE,
        initialState: {
          login: '',
          password: '',
        },
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
