import type { SinonFakeTimers } from 'sinon';

import { assert } from 'chai';
import sinon from 'sinon';

import { HTTP_METHODS } from './constants';
import { HTTPClient } from './HTTPClient';
import { createFakeXhrClass } from './tests/createFakeXhrClass';

describe('Модуль отправки HTTP запросов', () => {
  const TEST_ENDPOINT = '/test';
  const TEST_OBJECT_DATA = { key: 'value' };

  const xhrOriginal = globalThis.XMLHttpRequest;

  const xhrFake = createFakeXhrClass();

  let clockFake: SinonFakeTimers;

  before(() => {
    clockFake = sinon.useFakeTimers();

    globalThis.XMLHttpRequest = xhrFake as unknown as typeof XMLHttpRequest;
  });

  after(() => {
    clockFake.restore();

    xhrFake.currentXHR = null;

    globalThis.XMLHttpRequest = xhrOriginal;
  });

  // GET, POST, PUT, PATCH, DELETE
  describe('HTTP методы', () => {
    // Корректное составление урла с query параметрами
    it('GET формирует запрос с корректными аргументами', async () => {
      const TEST_QUERY_STRING = '?testKey1=testValue1&testKey2[0]=12&?testKey3[key]=value';

      const TEST_QUERY_DATA = {
        testKey1: 'testValue1',
        testKey2: [12],
        testKey3: {
          key: 'value',
        },
      };

      HTTPClient.get(TEST_ENDPOINT, {
        data: TEST_QUERY_DATA,
      });

      await clockFake.runAllAsync();

      assert.equal(
        xhrFake.currentXHR?.url,
        `${HTTPClient.BASE_URL}${TEST_ENDPOINT}${TEST_QUERY_STRING}`,
      );
      assert.equal(xhrFake.currentXHR?.method, 'GET');
    });

    it('POST формирует запрос с корректными аргументами', async () => {
      HTTPClient.post(TEST_ENDPOINT, {
        data: TEST_OBJECT_DATA,
      });

      await clockFake.runAllAsync();

      assert.equal(xhrFake.currentXHR?.url, `${HTTPClient.BASE_URL}${TEST_ENDPOINT}`);
      assert.equal(xhrFake.currentXHR?.method, 'POST');
    });

    it('PUT формирует запрос с корректными аргументами', async () => {
      HTTPClient.put(TEST_ENDPOINT);

      await clockFake.runAllAsync();

      assert.equal(xhrFake.currentXHR?.url, `${HTTPClient.BASE_URL}${TEST_ENDPOINT}`);
      assert.equal(xhrFake.currentXHR?.method, 'PUT');
    });

    it('PATCH формирует запрос с корректными аргументами', async () => {
      HTTPClient.patch(TEST_ENDPOINT);

      await clockFake.runAllAsync();

      assert.equal(xhrFake.currentXHR?.url, `${HTTPClient.BASE_URL}${TEST_ENDPOINT}`);
      assert.equal(xhrFake.currentXHR?.method, 'PATCH');
    });

    it('DELETE формирует запрос с корректными аргументами', async () => {
      HTTPClient.delete(TEST_ENDPOINT);

      await clockFake.runAllAsync();

      assert.equal(xhrFake.currentXHR?.url, `${HTTPClient.BASE_URL}${TEST_ENDPOINT}`);
      assert.equal(xhrFake.currentXHR?.method, 'DELETE');
    });
  });

  describe('Базовый request метод', () => {
    describe('Инициализация', () => {
      it('Корректная инициализация без заголовков', async () => {
        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.GET,
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.withCredentials);
        assert.equal(xhrFake.currentXHR?.responseType, 'json');
        assert.isTrue(xhrFake.currentXHR?.setRequestHeader.notCalled);
        assert.isTrue(xhrFake.currentXHR?.open.calledOnceWithExactly(HTTP_METHODS.GET, TEST_ENDPOINT));
      });

      it('Корректная инициализация с заголовками', async () => {
        const TEST_HEADER_KEY = 'X-Test-Header';
        const TEST_HEADER_VALUE = 'value';

        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
          headers: { [TEST_HEADER_KEY]: TEST_HEADER_VALUE },
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.withCredentials);
        assert.equal(xhrFake.currentXHR?.responseType, 'json');
        assert.isTrue(xhrFake.currentXHR?.setRequestHeader.calledOnceWithExactly(TEST_HEADER_KEY, TEST_HEADER_VALUE));
        assert.isTrue(xhrFake.currentXHR?.open.calledOnceWithExactly(HTTP_METHODS.POST, TEST_ENDPOINT));
      });
    });

    describe('Корректная отправка данных', () => {
      it('Отправка данных с телом запроса GET', async () => {
        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.GET,
          data: { key: 'value' },
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.send.calledOnce);
        assert.isEmpty(xhrFake.currentXHR?.send.lastCall.args);
      });

      it('Отправка данных без тела запроса NOT GET', async () => {
        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.send.calledOnce);
        assert.isEmpty(xhrFake.currentXHR?.send.lastCall.args);
      });

      it('Отправка данных с телом запроса NOT GET FormData', async () => {
        const TEST_FORM_DATA = new FormData();

        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.PUT,
          data: TEST_FORM_DATA,
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.send.calledOnce);
        assert.strictEqual(xhrFake.currentXHR?.send.lastCall.args[0], TEST_FORM_DATA);
      });

      it('Отправка данных с телом запроса NOT GET Object', async () => {
        HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.PATCH,
          data: TEST_OBJECT_DATA,
        });

        await clockFake.runAllAsync();

        assert.isTrue(xhrFake.currentXHR?.send.calledOnce);
        assert.isTrue(xhrFake.currentXHR?.setRequestHeader.calledOnceWithExactly('Content-Type', 'application/json'));
        assert.strictEqual(xhrFake.currentXHR?.send.lastCall.args[0], JSON.stringify(TEST_OBJECT_DATA));
      });
    });

    describe('Корректная обработка ответа', () => {
      it('Обычный ответ', async () => {
        const promise = HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
          data: TEST_OBJECT_DATA,
        });

        clockFake.runAll();

        await assert.eventually.strictEqual(promise, JSON.stringify(TEST_OBJECT_DATA));
      });
    });

    describe('Особые кейсы', () => {
      it('Корректная обработка AbortController', async () => {
        await assert.isRejected((async () => {
          const abortController = new AbortController();

          const requestPromise = HTTPClient.request(TEST_ENDPOINT, {
            method: HTTP_METHODS.GET,
          }, abortController.signal);

          abortController.abort();

          clockFake.runAll();

          await requestPromise;
        })());

        assert.isTrue(xhrFake.currentXHR?.abort.calledOnce);
      });
    });

    describe('Корректная обработка ошибок', () => {
      it('Обработка таймаута', async () => {
        const promise = HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
          data: 'timeout',
        });

        clockFake.runAll();

        await assert.isRejected(promise);
      });

      it('Обработка ошибки запроса', async () => {
        const promise = HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
          data: 'crash',
        });

        clockFake.runAll();

        await assert.isRejected(promise);
      });

      it('Обработка ошибки ответа', async () => {
        const errorText = 'error';

        const promise = HTTPClient.request(TEST_ENDPOINT, {
          method: HTTP_METHODS.POST,
          data: errorText,
        });

        clockFake.runAll();

        await assert.isRejected(promise, errorText);
      });
    });
  });
});
