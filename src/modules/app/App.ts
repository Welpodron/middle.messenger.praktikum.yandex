import Handlebars from "handlebars";

import partials from "../../shared/partials";

import { Home as HomePage } from "../../pages/home";
import { NotFound as NotFoundPage } from "../../pages/not-found";
import { SomethingWrong as SomethingWrongPage } from "../../pages/something-wrong";
import { Settings as SettingsPage } from "../../pages/settings";
import { Login as LoginPage } from "../../pages/login";
import { SignUp as SignUpPage } from "../../pages/sign-up";
import { Messenger as MessengerPage } from "../../pages/messenger";

export class App {
  rootElement: Element;

  constructor(rootElement: Element) {
    this.rootElement = rootElement;

    this.registerPartials();
  }

  route = (page: string) => {
    switch (page) {
      case "/":
        return HomePage();
      case "/error":
        return SomethingWrongPage();
      case "/login":
        return LoginPage();
      case "/sign-up":
        return SignUpPage();
      case "/messenger":
        return MessengerPage();
      case "/settings":
        return SettingsPage();
      default:
        return NotFoundPage();
    }
  };

  render = () => {
    this.rootElement.innerHTML = this.route(window.location.pathname);
  };

  registerPartials = () => {
    Object.entries(partials).forEach(([name, partial]) => {
      Handlebars.registerPartial(name, partial);
    });
  };
}
