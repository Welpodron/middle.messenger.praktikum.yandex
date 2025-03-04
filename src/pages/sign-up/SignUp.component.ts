import type { TDynamicObject } from '../../shared/types/utils';

import type { TSignUpChildren } from './types';

import { Block } from '../../shared/components/Block';

import { FormSignUp } from './components/FormSignUp';

import { PAGE_TITLE } from './constants';

import template from './SignUp.hbs';

export class SignUp extends Block<TDynamicObject, TSignUpChildren> {
  constructor() {
    super({
      FormSignUp: new FormSignUp({
        title: PAGE_TITLE,
        // TODO: нужно вообще в целом сделать initialState опциональным, чтобы не передавать вот такое вот
        initialState: {
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
          password: '',
          password_repeated: '',
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
