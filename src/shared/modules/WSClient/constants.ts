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

export const WS_SEND_CONNECT_ERROR = 'Перед отправкой сообщения необходимо создать ws соединение, используя метод connect()';
export const WS_SEND_NOT_CONNECTED_ERROR = `WebSocket соединение не открыто, текущее состояние: `;
export const WS_INTERNAL_ERROR = 'Ошибка при взаимодействии с WebSocket сервером';
