import type { Route } from '@components/Route';

import { log } from '@utils/log';

class _Router {
  private _currentRoute: Route | null = null;
  private _routes: Record<string, Route> = {};
  private _rootElement: Element | null = null;
  private _isStarted = false;

  constructor(rootElement: Element) {
    this._rootElement = rootElement;
  }

  private async _route(path: string) {
    log({
      module: 'ROUTER',
      message: `ROUTING TO: ${path}`,
    });

    if (!this._rootElement) {
      throw new Error('Не найден root элемент для роутинга');
    }

    const Route = this._routes[path] ?? this._routes['*'];

    if (!Route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = Route;

    // render не обязан вернуть элемент, если конкретный route не вернул ничего (допустим если не хватает прав и тд)
    const element = await this._currentRoute.render();

    if (!element) {
      return;
    }

    this._rootElement.innerHTML = '';
    this._rootElement.append(element);

    log({
      module: 'ROUTER',
      message: `ENTERED: ${path}`,
    });

    this._currentRoute.mount();
  }

  async go(path: string, state?: unknown) {
    window.history.pushState(state, '', path);

    await this._route(path);
  }

  redirect(path: string) {
    window.location.replace(path);
  }

  async start(path: string) {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;

    window.onpopstate = async () => {
      await this._route(window.location.pathname);
    };

    await this._route(path);
  }

  use(path: string, route: Route) {
    this._routes[path] = route;

    return this;
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}

export const Router = new _Router(document.getElementById('root')!);
