export const BASE_URL = 'wss://ya-praktikum.tech/ws';
export const PING_INTERVAL = 7500;

export const enum WSClientEvents {
  MESSAGE_PING = 'message_ping',
  MESSAGE_USER_CONNECTION = 'message_user_connection',
  MESSAGE = 'message',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
}
