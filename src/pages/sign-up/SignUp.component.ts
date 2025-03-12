import type { TDynamicObject } from '@app/types/utils';

import type { TSignUpChildren } from './types';

import { Block } from '@components/Block';

import { FormSignUp } from './components/FormSignUp';

import { PAGE_TITLE } from './constants';

import template from './SignUp.hbs';

export class SignUp extends Block<HTMLElement, TDynamicObject, TSignUpChildren> {
  constructor() {
    super({
      FormSignUp: new FormSignUp({
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
