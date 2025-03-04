import type { TCallback } from '../../types/utils';

export class EventBus {
  private _listeners: Record<string, TCallback[]>;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: TCallback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: string, callback: TCallback) {
    if (!this._listeners[event]) {
      throw new Error(
        `Обнаружена попытка отписаться от события "${event}" у которого отсутствуют подписчики`,
      );
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
      throw new Error(
        `Обнаружена попытка вызвать событие "${event}" у которого отсутствуют подписчики`,
      );
    }

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  clear() {
    this._listeners = {};
  }
}
