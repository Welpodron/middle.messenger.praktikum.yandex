import { EventBus } from '@modules/EventBus';
import { log } from '@utils/log';

import { BASE_URL, PING_INTERVAL, WSClientEvents } from './constants';
import { WSClientError } from './errors/WSClientError';

// https://ya-praktikum.tech/api/v2/openapi/ws
export class WSClient extends EventBus {
  private _socket: WebSocket | null = null;
  private _path: string;
  private _interval?: ReturnType<typeof setInterval>;

  constructor(entrypoint: string) {
    super();

    this._path = `${BASE_URL}${entrypoint}`;
  }

  send(data: unknown) {
    log({
      module: 'WS',
      message: ['Отправка ws сообщения', data, this._socket?.readyState],
    });

    if (!this._socket) {
      throw new WSClientError(
        {
          message: 'Перед отправкой сообщения необходимо создать ws соединение, используя метод connect',
        },
      );
    }

    if (this._socket.readyState !== WebSocket.OPEN) {
      throw new WSClientError(
        {
          message: `WebSocket соединение не открыто, текущее состояние: ${this._socket.readyState}`,
        },
      );
    }

    this._socket.send(JSON.stringify(data));
  }

  disconnect() {
    clearInterval(this._interval);

    this.clear();

    this._socket?.close();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(this._path);

      this._socket.onerror = (event) => {
        if (this._socket?.readyState === WebSocket.CLOSED || this._socket?.readyState === WebSocket.CLOSING) {
          log({
            module: 'WS',
            type: 'warn',
            message: ['WebSocket соединение уже закрыто', event],
          });

          return;
        }

        log({
          module: 'WS',
          type: 'error',
          message: ['Ошибка ws соединения', event],
        });

        this.emit(WSClientEvents.ERROR, event);

        reject(new WSClientError({
          message: 'Ошибка при взаимодействии с WebSocket сервером',
        }));
      };

      this._socket.onclose = (event) => {
        log({
          module: 'WS',
          message: ['Закрыто ws соединение', event],
        });

        this.emit(WSClientEvents.DISCONNECT, event);
      };

      this._socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);

        log({
          module: 'WS',
          message: ['Получено ws сообщение', event, parsedData],
        });

        // Пример данных, которые приходят с сервера при подключении нового пользователя к чату:
        // "{\"content\":\"ID пользователя который подключился к чату\",\"type\":\"user connected\"}"

        if (parsedData.type === 'pong') {
          return this.emit(WSClientEvents.MESSAGE_PING, parsedData);
        }

        if (parsedData.type === 'user connected') {
          return this.emit(WSClientEvents.MESSAGE_USER_CONNECTION, parsedData);
        }

        this.emit(WSClientEvents.MESSAGE, parsedData);
      };

      this._socket.onopen = (event) => {
        log({
          module: 'WS',
          message: ['Открыто ws соединение', event, this._socket],
        });

        this._interval = setInterval(() => {
          this.send({ type: 'ping' });
        }, PING_INTERVAL);

        this.emit(WSClientEvents.CONNECT, event);

        resolve(event);
      };
    });
  }
}
