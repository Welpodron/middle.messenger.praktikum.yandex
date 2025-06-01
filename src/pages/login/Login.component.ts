import type { TDynamicObject } from '@app/types/utils';
import type { TLoginChildren } from './types';

import { Page } from '@components/Page';
import { AuthController } from '@controllers/Auth';

import { FormLogin } from './components/FormLogin';
import { PAGE_TITLE } from './constants';
import template from './Login.hbs';

export class Login extends Page<HTMLElement, TDynamicObject, TLoginChildren> {
  constructor() {
    super({
      FormLogin: new FormLogin({
        title: PAGE_TITLE,
        onSubmit: (state) => {
          AuthController.signin({
            queryParams: state,
            onBeforeTransaction: () => {
              this.children.FormLogin.disable();
              this.children.FormLogin.children.ButtonAuth.setProps({
                isLoading: true,
              });
            },
            onError: (error) => {
              this.children.FormLogin.toggleError(error);
              this.children.FormLogin.enable();
              this.children.FormLogin.children.ButtonAuth.setProps({
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
