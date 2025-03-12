import { CHATS_MOCK, USERS_MOCK } from '../../shared/mocks';

import { Home as HomePage } from '../../pages/home';
import { NotFound as NotFoundPage } from '../../pages/not-found';
import { SomethingWrong as SomethingWrongPage } from '../../pages/something-wrong';
import { Settings as SettingsPage } from '../../pages/settings';
import { Login as LoginPage } from '../../pages/login';
import { SignUp as SignUpPage } from '../../pages/sign-up';
import { Messenger as MessengerPage } from '../../pages/messenger';

export class App {
  rootElement: Element;

  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  // TODO: Переделать после того как станет понятно как будет выглядеть роутинг
  route(page: string) {
    switch (page) {
      case '/':
        return new HomePage();
      case '/error':
        return new SomethingWrongPage();
      case '/login':
        return new LoginPage();
      case '/sign-up':
        return new SignUpPage();
      case '/messenger':
        return new MessengerPage({
          chats: CHATS_MOCK,
          currentUser: USERS_MOCK[0],
        });
      case '/settings':
        return new SettingsPage({
          currentUser: USERS_MOCK[0],
        });
      default:
        return new NotFoundPage();
    }
  };

  render() {
    const routeComponent = this.route(window.location.pathname);

    const element = routeComponent.getContent();

    if (!element) {
      throw new Error(`У компонента "${routeComponent.constructor}" не удалось получить _element`);
    }

    this.rootElement.append(element);

    routeComponent.dispatchComponentDidMount();
  };
}
