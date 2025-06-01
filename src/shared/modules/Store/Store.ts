import type { TObjectKeyPath, TObjectKeyPathValue } from '@app/types/utils';
import type { TAppState } from './types';

import { EventBus } from '@modules/EventBus';
import { deepCompare } from '@utils/deepCompare';
import { deepGet } from '@utils/deepGet';
import { deepSet } from '@utils/deepSet';
import { log } from '@utils/log';

import { DEFAULT_STORE_STATE, STORE_EVENTS } from './constants';

class _Store extends EventBus {
  private _state: TAppState;

  constructor(state: TAppState) {
    super();

    this._state = state;
  }

  get state() {
    return this._state;
  }

  set<TKeyPath extends TObjectKeyPath<TAppState>>(
    key: TKeyPath,
    value: TObjectKeyPathValue<TAppState, TKeyPath>,
  ) {
    const nextState = deepSet(this._state, key, value);

    if (deepCompare(nextState, this._state)) {
      return;
    }

    const prevState = this._state;

    this._state = nextState;

    log({
      module: 'STORE',
      message: [`Обновлен: ${key}`, { prevStoreState: prevState, nextStoreState: nextState }],
    });

    this.emit(STORE_EVENTS.FLOW_SDU, prevState, nextState);
  }

  get<TKeyPath extends TObjectKeyPath<TAppState>>(key: TKeyPath) {
    return deepGet(this._state, key);
  }

  reset() {
    const prevState = this._state;

    this._state = DEFAULT_STORE_STATE;

    log({
      module: 'STORE',
      message: [`Сброс стора`, { prevStoreState: prevState, nextStoreState: this._state }],
    });

    this.emit(STORE_EVENTS.FLOW_SDU, prevState, this._state);
  }
}

export const Store = new _Store(DEFAULT_STORE_STATE);
