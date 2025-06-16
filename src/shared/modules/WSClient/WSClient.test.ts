import type { SinonFakeTimers } from 'sinon';

import { assert } from 'chai';
import sinon from 'sinon';

import { WS_SEND_CONNECT_ERROR, WSClientEvents } from './constants';
import { createFakeWsClass } from './tests/createFakeWsClass';
import { WSClient } from './WSClient';

describe('Модуль отправки WS запросов', () => {
  const TEST_ENDPOINT = '/test';
  const TEST_PING_PAYLOAD = { type: 'ping' };

  const wsOriginal = globalThis.WebSocket;

  const wsFake = createFakeWsClass();

  let clockFake: SinonFakeTimers;

  before(() => {
    clockFake = sinon.useFakeTimers();

    globalThis.WebSocket = wsFake as unknown as typeof WebSocket;
  });

  after(() => {
    clockFake.restore();

    globalThis.WebSocket = wsOriginal;
  });

  describe('Корректное подключение', () => {
    it('Базовое подключение connect()', async () => {
      const poolingStub = sinon.stub(WSClient.prototype, 'startPooling');
      const emitSpy = sinon.spy(WSClient.prototype, 'emit');

      const wsClient = new WSClient(TEST_ENDPOINT);

      wsClient.connect();

      await clockFake.runAllAsync();

      assert.isTrue(poolingStub.calledOnce);
      assert.isTrue(emitSpy.calledOnce);
      assert.strictEqual(emitSpy.lastCall.args[0], WSClientEvents.CONNECT);

      poolingStub.restore();
      emitSpy.restore();
    });
  });

  describe('Корректное закрытие соединения', () => {
    it('Базовое отключение disconnect()', async () => {
      const poolingStub = sinon.stub(WSClient.prototype, 'startPooling');
      const clearSpy = sinon.spy(WSClient.prototype, 'clear');
      const emitSpy = sinon.spy(WSClient.prototype, 'emit');

      const wsClient = new WSClient(TEST_ENDPOINT);

      wsClient.connect();

      await clockFake.runAllAsync();

      wsClient.disconnect();

      clockFake.runAll();

      assert.isTrue(clearSpy.calledOnce);
      assert.strictEqual(emitSpy.lastCall.args[0], WSClientEvents.DISCONNECT);

      poolingStub.restore();
      clearSpy.restore();
      emitSpy.restore();
    });
  });

  describe('Корректная отправка сообщений', () => {
    it('Отправка сообщения send() без открытия соединения connect() запрещена', () => {
      const wsClient = new WSClient(TEST_ENDPOINT);

      clockFake.runAll();

      assert.throws(() => {
        wsClient.send(TEST_PING_PAYLOAD);
      }, WS_SEND_CONNECT_ERROR);
    });

    it('Базовая отправка send()', async () => {
      const poolingStub = sinon.stub(WSClient.prototype, 'startPooling');
      const sendSpy = sinon.spy(WSClient.prototype, 'send');

      const wsClient = new WSClient(TEST_ENDPOINT);

      wsClient.connect();

      await clockFake.runAllAsync();

      wsClient.send(TEST_PING_PAYLOAD);

      clockFake.runAll();

      assert.isTrue(poolingStub.calledOnce);
      assert.isTrue(sendSpy.calledOnce);
      assert.strictEqual(sendSpy.lastCall.args[0], TEST_PING_PAYLOAD);

      poolingStub.restore();
      sendSpy.restore();
    });
  });

  describe('Корректное получение сообщений', () => {
    it('Базовый прием сообщений', async () => {
      const poolingStub = sinon.stub(WSClient.prototype, 'startPooling');
      const emitSpy = sinon.spy(WSClient.prototype, 'emit');

      const wsClient = new WSClient(TEST_ENDPOINT);

      wsClient.connect();

      await clockFake.runAllAsync();

      wsClient.send(TEST_PING_PAYLOAD);

      clockFake.runAll();

      assert.isTrue(poolingStub.calledOnce);
      assert.strictEqual(emitSpy.lastCall.args[0], WSClientEvents.MESSAGE);

      poolingStub.restore();
      emitSpy.restore();
    });
  });
});
