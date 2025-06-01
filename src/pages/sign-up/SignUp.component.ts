import type { TDynamicObject } from '@app/types/utils';
import type { TSignUpChildren } from './types';

import { Page } from '@components/Page';
import { AuthController } from '@controllers/Auth';

import { FormSignUp } from './components/FormSignUp';
import { PAGE_TITLE } from './constants';
import template from './SignUp.hbs';

export class SignUp extends Page<HTMLElement, TDynamicObject, TSignUpChildren> {
  constructor() {
    super({
      FormSignUp: new FormSignUp({
        title: PAGE_TITLE,
        onSubmit: (state) => {
          AuthController.signup({
            queryParams: state,
            onBeforeTransaction: () => {
              this.children.FormSignUp.disable();
              this.children.FormSignUp.children.ButtonRegister.setProps({
                isLoading: true,
              });
            },
            onError: (error) => {
              this.children.FormSignUp.toggleError(error);
              this.children.FormSignUp.enable();
              this.children.FormSignUp.children.ButtonRegister.setProps({
                isLoading: false,
              });
            },
          });
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
