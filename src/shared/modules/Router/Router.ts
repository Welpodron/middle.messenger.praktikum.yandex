import type { Route } from '@components/Route';

import { log } from '@utils/log';

import { ROUTER_MOUNT_ERROR, ROUTER_ROOT_ELEMENT_ID, ROUTER_START_ERROR } from './constants';
import { RouterError } from './errors/RouterError';

class _Router {
  private _currentRoute: { path: string; route: Route } | null = null;
  private _routes: Record<string, Route> = {};
  private _rootElement: Element | null = null;
  private _isStarted = false;

  constructor(rootElement: Element) {
    this._rootElement = rootElement;
  }

  private async _route(path: string) {
    if (!this._isStarted) {
      throw new RouterError({
        message: ROUTER_START_ERROR,
      });
    }

    log({
      module: 'ROUTER',
      message: `ROUTING TO: ${path}`,
    });

    if (!this._rootElement) {
      throw new RouterError({
        message: ROUTER_MOUNT_ERROR,
      });
    }

    const Route = this._routes[path] ?? this._routes['*'];

    if (!Route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.route.leave();
    }

    this._currentRoute = { path, route: Route };

    // render не обязан вернуть элемент, если конкретный route не вернул ничего (допустим если не хватает прав и тд)
    const element = await this._currentRoute.route.render();

    if (!element) {
      return;
    }

    this._rootElement.innerHTML = '';
    this._rootElement.append(element);

    log({
      module: 'ROUTER',
      message: `ENTERED: ${path}`,
    });

    this._currentRoute.route.mount();
  }

  async go(path: string, state?: unknown) {
    if (!this._isStarted) {
      throw new RouterError({
        message: ROUTER_START_ERROR,
      });
    }

    window.history.pushState(state, '', path);

    await this._route(path);
  }

  redirect(path: string) {
    if (!this._isStarted) {
      throw new RouterError({
        message: ROUTER_START_ERROR,
      });
    }

    window.location.replace(path);
  }

  async start(startingPath?: string) {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;

    window.onpopstate = async () => {
      log({
        module: 'ROUTER',
        message: `STATE_CHANGE_TO: ${window.location.pathname}`,
      });

      await this._route(window.location.pathname);
    };

    if (startingPath) {
      await this._route(startingPath);
    }
  }

  use(path: string, route: Route) {
    this._routes[path] = route;

    return this;
  }

  get currentRoute() {
    return this._currentRoute;
  }

  get routes() {
    return this._routes;
  }

  get rootElement() {
    return this._rootElement;
  }

  stop() {
    this._isStarted = false;

    this._currentRoute = null;

    this._routes = {};

    window.onpopstate = null;
  }

  back() {
    if (!this._isStarted) {
      throw new RouterError({
        message: ROUTER_START_ERROR,
      });
    }

    window.history.back();
  }

  forward() {
    if (!this._isStarted) {
      throw new RouterError({
        message: ROUTER_START_ERROR,
      });
    }

    window.history.forward();
  }
}

export const Router = new _Router(document.getElementById(ROUTER_ROOT_ELEMENT_ID)!);
