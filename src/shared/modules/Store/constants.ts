import type { TAppState } from './types';

export const enum STORE_EVENTS {
  FLOW_SDU = 'flow:store-did-update',
}

export const DEFAULT_STORE_STATE: TAppState = {
  user: undefined,
  chats: [],
  chat: undefined,
  chatsUsers: {},
  chatsMessages: {},
  alerts: [],
};
