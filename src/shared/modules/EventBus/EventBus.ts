import type { TCallback } from '../../types/utils';

export class EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _listeners: Record<string, TCallback<any[], unknown>[]>;

  constructor() {
    this._listeners = {};
  }

  get listeners() {
    return this._listeners;
  }

  on<TCallbackArgs extends unknown[], TCallbackReturn>(event: string, callback: TCallback<TCallbackArgs, TCallbackReturn>) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off<TCallbackArgs extends unknown[], TCallbackReturn>(event: string, callback: TCallback<TCallbackArgs, TCallbackReturn>) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event] = this._listeners[event].filter(
      listener => listener !== callback,
    );

    if (!this._listeners[event].length) {
      delete this._listeners[event];
    }
  }

  emit(event: string, ...args: unknown[]) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  clear() {
    this._listeners = {};
  }
}
