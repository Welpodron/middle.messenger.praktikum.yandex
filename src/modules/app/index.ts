import Handlebars from 'handlebars';
import { PrivateRoute } from '@components/PrivateRoute';
import { Route } from '@components/Route';
import { breaklines } from '@helpers/breaklines';
import { dater } from '@helpers/dater';
import { isArray } from '@helpers/isArray';
import { isEqual } from '@helpers/isEqual';
import { trim } from '@helpers/trim';
import { Router } from '@modules/Router';

import { Home as HomePage } from '../../pages/home';
import { Login as LoginPage } from '../../pages/login';
import { Messenger as MessengerPage } from '../../pages/messenger';
import { NotFound as NotFoundPage } from '../../pages/not-found';
import { Settings as SettingsPage } from '../../pages/settings';
import { SignUp as SignUpPage } from '../../pages/sign-up';
import { SomethingWrong as SomethingWrongPage } from '../../pages/something-wrong';

export class App {
  rootElement: Element;

  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  registerHelpers() {
    Handlebars.registerHelper('breaklines', breaklines);
    Handlebars.registerHelper('dater', dater);
    Handlebars.registerHelper('trim', trim);
    Handlebars.registerHelper('isArray', isArray);
    Handlebars.registerHelper('isEqual', isEqual);
  }

  async initialize() {
    this.registerHelpers();

    await Router.use('/', new Route(HomePage, 'Мега-крутой мессенджер™'))
      .use('/settings', new PrivateRoute(SettingsPage, 'Мои настройки'))
      .use('/login', new Route(LoginPage, 'Вход'))
      .use('/sign-up', new Route(SignUpPage, 'Регистрация'))
      .use('/messenger', new PrivateRoute(MessengerPage, 'Мессенджер'))
      .use(
        '/something-wrong',
        new Route(SomethingWrongPage, 'Что-то пошло не так :c'),
      )
      .use('*', new Route(NotFoundPage, 'Страница не найдена'))
      .start(window.location.pathname);
  }
}
