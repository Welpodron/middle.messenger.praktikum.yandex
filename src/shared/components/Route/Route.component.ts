import type { Block } from '@components/Block';

export class Route {
  private _blockClass: (new () => Block);
  private _blockInstance: Block | null = null;
  private _routeTitle?: string;

  constructor(blockClass: (new () => Block), routeTitle?: string) {
    this._blockClass = blockClass;
    this._routeTitle = routeTitle;
  }

  leave() {
    this._blockInstance?.dispatchComponentWillUnmount();
    this._blockInstance = null;
  }

  mount() {
    this._blockInstance?.dispatchComponentDidMount();
  }

  async render(): Promise<Element | null | void> {
    if (this._routeTitle) {
      document.title = this._routeTitle;
    }

    this._blockInstance = new this._blockClass();

    this._blockInstance.init();

    return this._blockInstance.getContent();
  }
}
