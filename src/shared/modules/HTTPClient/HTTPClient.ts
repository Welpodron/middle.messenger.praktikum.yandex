import type { TDynamicObject } from '../../types/utils';
import type { TRequest, TRequestOptions } from './types';

import { dataToQueryString } from './utils/dataToQueryString';

import { BASE_URL, HTTP_METHODS } from './constants';

export class HTTPClient {
  private _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = `${BASE_URL}${endpoint}`;
  }

  // TODO: В большинстве классов используются методы не в виде стрелочных функций, нужно привести к одному формату, пока что это копипаста из тренажера, отрефачить в некст спринтах
  get: TRequest = (path, options = {}) =>
    this.request(`${this._endpoint + path}${dataToQueryString(options.data as TDynamicObject)}`, {
      method: HTTP_METHODS.GET,
    });

  post: TRequest = (path, options = {}) =>
    this.request(this._endpoint + path, { ...options, method: HTTP_METHODS.POST });

  put: TRequest = (path, options = {}) =>
    this.request(this._endpoint + path, { ...options, method: HTTP_METHODS.PUT });

  patch: TRequest = (path, options = {}) =>
    this.request(this._endpoint + path, { ...options, method: HTTP_METHODS.PATCH });

  delete: TRequest = (path, options = {}) =>
    this.request(this._endpoint + path, { ...options, method: HTTP_METHODS.DELETE });

  // TODO: Мб добавить timeout и retry по дефолту??
  request = (url: string, options: TRequestOptions) => {
    const { method = 'GET', data, headers } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        }
        else {
          reject(
            new Error(
              `[${xhr.status}] Не удалось осуществить запрос: ${
                xhr.response?.reason || 'Непредвиденная ошибка'
              }`,
            ),
          );
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === HTTP_METHODS.GET || !data) {
        xhr.send();
      }
      else if (data instanceof FormData) {
        xhr.send(data);
      }
      else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
