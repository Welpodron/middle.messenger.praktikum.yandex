import type { TDynamicObject } from '../../types/utils';
import type { TRequestOptions } from './types';

import { log } from '@utils/log';

import { BASE_URL, HTTP_METHODS } from './constants';
import { HTTPClientError } from './errors/HTTPClientError';
import { dataToQueryString } from './utils/dataToQueryString';

export class HTTPClient {
  static BASE_URL = BASE_URL;

  static get<TResponseData>(path: string, options: TRequestOptions = {}, signal?: AbortSignal) {
    return HTTPClient.request<TResponseData>(
      `${HTTPClient.BASE_URL}${path}${dataToQueryString(
        options.data as TDynamicObject,
      )}`,
      {
        method: HTTP_METHODS.GET,
      },
      signal,
    );
  }

  static post<TResponseData>(path: string, options: TRequestOptions = {}, signal?: AbortSignal) {
    return HTTPClient.request<TResponseData>(`${HTTPClient.BASE_URL}${path}`, {
      ...options,
      method: HTTP_METHODS.POST,
    }, signal);
  }

  static put<TResponseData>(path: string, options: TRequestOptions = {}, signal?: AbortSignal) {
    return HTTPClient.request<TResponseData>(`${HTTPClient.BASE_URL}${path}`, {
      ...options,
      method: HTTP_METHODS.PUT,
    }, signal);
  }

  static patch<TResponseData>(path: string, options: TRequestOptions = {}, signal?: AbortSignal) {
    return HTTPClient.request<TResponseData>(`${HTTPClient.BASE_URL}${path}`, {
      ...options,
      method: HTTP_METHODS.PATCH,
    }, signal);
  }

  static delete<TResponseData>(path: string, options: TRequestOptions = {}, signal?: AbortSignal) {
    HTTPClient.request<TResponseData>(`${HTTPClient.BASE_URL}${path}`, {
      ...options,

      method: HTTP_METHODS.DELETE,
    }, signal);
  }

  // TODO: Мб добавить timeout и retry по дефолту??
  static request<TResponseData>(url: string, options: TRequestOptions, signal?: AbortSignal) {
    const { method = 'GET', data, headers } = options;

    log({
      module: 'HTTP CLIENT',
      message: `${method} ${url}`,
    });

    return new Promise<TResponseData>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        }
        else {
          reject(
            new HTTPClientError({
              code: xhr.status,
              message: xhr.response?.reason || 'Непредвиденная ошибка',
            }),
          );
        }
      };

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      if (signal) {
        signal.addEventListener('abort', () => {
          xhr.abort();
        });
      }

      xhr.open(method, url);

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
  }
}
