import { AuthController } from '@controllers/Auth';
import { Router } from '@modules/Router';

import { Route } from '../Route';

export class PrivateRoute extends Route {
  constructor(...args: ConstructorParameters<typeof Route>) {
    super(...args);
  }

  async render() {
    const authSuccess = await AuthController.authenticate();

    if (authSuccess) {
      return super.render();
    }

    Router.go('/login');
  }
}
