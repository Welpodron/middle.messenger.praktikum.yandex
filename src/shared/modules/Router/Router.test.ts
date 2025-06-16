import type { SinonFakeTimers } from 'sinon';

import { createMockBlockClass } from '@components/Block/tests/createMockBlockClass';
import { createMockRoute } from '@components/Route/tests/createMockRoute';
import { assert } from 'chai';
import sinon from 'sinon';

import { ROUTER_START_ERROR } from './constants';
import { Router } from './Router';

describe('Роутер', () => {
  const TEST_ROUTES = {
    TEST_ROUTE_1: '/test1',
    TEST_ROUTE_2: '/test2',
  };
  const TEST_BLOCKS_MOCKS_TEMPLATES = {
    TEST_BLOCK_MOCK_1: '<div>Test BlockMock 1 Content</div>',
    TEST_BLOCK_MOCK_2: '<div>Test BlockMock 2 Content</div>',
  };

  let clockFake: SinonFakeTimers;

  before(() => {
    clockFake = sinon.useFakeTimers();
  });

  after(() => {
    clockFake.restore();
  });

  afterEach(() => {
    Router.stop();
  });

  describe('Инициализация', () => {
    it('Регистрация нового маршрута use()', () => {
      assert.isEmpty(Object.entries(Router.routes));

      const mockRoute = createMockRoute(createMockBlockClass());

      const routerInstance = Router.use(TEST_ROUTES.TEST_ROUTE_1, mockRoute);

      assert.strictEqual(routerInstance, Router);

      assert.isNull(Router.currentRoute);

      assert.isNotEmpty(Object.entries(Router.routes));
      assert.lengthOf(Object.values(Router.routes), 1);
      assert.strictEqual(Object.values(Router.routes)[0], mockRoute);
      assert.strictEqual(
        Object.keys(Router.routes)[0],
        TEST_ROUTES.TEST_ROUTE_1,
      );
    });
  });

  describe('Навигация', () => {
    it('Использование без вызова start() блокирует любую навигацию', async () => {
      await assert.isRejected(
        Router.go(TEST_ROUTES.TEST_ROUTE_1),
        ROUTER_START_ERROR,
      );

      assert.throws(
        () => Router.redirect(TEST_ROUTES.TEST_ROUTE_1),
        ROUTER_START_ERROR,
      );
      assert.throws(() => Router.forward(), ROUTER_START_ERROR);
      assert.throws(() => Router.back(), ROUTER_START_ERROR);
    });

    describe('Особая навигация', () => {
      it('Редирект redirect()', async () => {
        const locationReplaceStub = sinon.stub();

        const windowOriginal = globalThis.window;

        globalThis.window = Object.defineProperties(
          {} as Window & typeof globalThis,
          {
            ...Object.getOwnPropertyDescriptors(windowOriginal),
            location: {
              value: {
                ...Object.getOwnPropertyDescriptors(windowOriginal.location),
                replace: locationReplaceStub,
              },
            },
          },
        );

        await Router.use(
          TEST_ROUTES.TEST_ROUTE_1,
          createMockRoute(createMockBlockClass()),
        ).start();

        Router.redirect(TEST_ROUTES.TEST_ROUTE_1);

        assert.isTrue(
          locationReplaceStub.calledOnceWithExactly(TEST_ROUTES.TEST_ROUTE_1),
        );

        globalThis.window = windowOriginal;
      });
    });

    describe('Навигация по маршрутам', () => {
      it('Стартовая навигация start()', async () => {
        const mockRoute = createMockRoute(createMockBlockClass());

        await Router.use(TEST_ROUTES.TEST_ROUTE_1, mockRoute).start(
          TEST_ROUTES.TEST_ROUTE_1,
        );

        assert.strictEqual(Router.currentRoute?.path, TEST_ROUTES.TEST_ROUTE_1);
        assert.strictEqual(Router.currentRoute?.route, mockRoute);
      });

      it('Базовая навигация go()', async () => {
        const historyPushStateSpy = sinon.spy(window.history, 'pushState');

        const mockRoute = createMockRoute(createMockBlockClass());

        await Router.use(TEST_ROUTES.TEST_ROUTE_1, mockRoute).start();

        await Router.go(TEST_ROUTES.TEST_ROUTE_1);

        assert.strictEqual(Router.currentRoute?.path, TEST_ROUTES.TEST_ROUTE_1);
        assert.strictEqual(Router.currentRoute?.route, mockRoute);

        assert.isTrue(
          historyPushStateSpy.calledOnceWithExactly(
            undefined,
            '',
            TEST_ROUTES.TEST_ROUTE_1,
          ),
        );
      });

      it('Навигация с незарегистрированным маршрутом, при отсутствии обработчика неизвестных маршрутов *', async () => {
        await Router.use(TEST_ROUTES.TEST_ROUTE_1, createMockRoute(createMockBlockClass())).start();

        await Router.go(TEST_ROUTES.TEST_ROUTE_2);

        assert.isNull(Router.currentRoute);
      });

      it('Навигация с незарегистрированным маршрутом, при наличии обработчика неизвестных маршрутов *', async () => {
        const mockRoute = createMockRoute(createMockBlockClass());

        await Router.use(TEST_ROUTES.TEST_ROUTE_1, createMockRoute(createMockBlockClass())).use('*', mockRoute).start();

        await Router.go(TEST_ROUTES.TEST_ROUTE_2);

        assert.strictEqual(Router.currentRoute?.path, TEST_ROUTES.TEST_ROUTE_2);
        assert.strictEqual(Router.currentRoute?.route, mockRoute);
      });
    });

    describe('Навигация по истории', () => {
      it('Навигация по истории назад back()', async () => {
        const historyBackSpy = sinon.spy(window.history, 'back');

        const mockRoute1 = createMockRoute(createMockBlockClass());
        const mockRoute2 = createMockRoute(createMockBlockClass());

        await Router.use(TEST_ROUTES.TEST_ROUTE_1, mockRoute1)
          .use(TEST_ROUTES.TEST_ROUTE_2, mockRoute2)
          .start();

        // UNKNOWN_HISTORY_STATE -> TEST_ROUTE_1
        await Router.go(TEST_ROUTES.TEST_ROUTE_1);

        // TEST_ROUTE_1 -> TEST_ROUTE_2
        await Router.go(TEST_ROUTES.TEST_ROUTE_2);

        // TEST_ROUTE_2 -> TEST_ROUTE_1
        Router.back();

        await clockFake.runAllAsync();

        assert.isTrue(historyBackSpy.calledOnce);

        assert.strictEqual(Router.currentRoute?.path, TEST_ROUTES.TEST_ROUTE_1);
        assert.strictEqual(Router.currentRoute?.route, mockRoute1);
      });

      it('Навигация по истории вперед forward()', async () => {
        const historyForwardSpy = sinon.spy(window.history, 'forward');

        const mockRoute1 = createMockRoute(createMockBlockClass());
        const mockRoute2 = createMockRoute(createMockBlockClass());

        await Router.use(TEST_ROUTES.TEST_ROUTE_1, mockRoute1)
          .use(TEST_ROUTES.TEST_ROUTE_2, mockRoute2)
          .start();

        // UNKNOWN_HISTORY_STATE -> TEST_ROUTE_2
        await Router.go(TEST_ROUTES.TEST_ROUTE_2);

        // TEST_ROUTE_2 -> TEST_ROUTE_1
        await Router.go(TEST_ROUTES.TEST_ROUTE_1);

        // Вызываем метод вне роутера, допустим при нажатии на кнопку
        // TEST_ROUTE_1 -> TEST_ROUTE_2
        window.history.back();

        await clockFake.runAllAsync();

        // TEST_ROUTE_2 -> TEST_ROUTE_1
        Router.forward();

        await clockFake.runAllAsync();

        assert.isTrue(historyForwardSpy.calledOnce);

        assert.strictEqual(Router.currentRoute?.path, TEST_ROUTES.TEST_ROUTE_1);
        assert.strictEqual(Router.currentRoute?.route, mockRoute1);
      });
    });
  });

  describe('Жизненный цикл маршрутов', () => {
    it('Рендер маршрута при навигации', async () => {
      const mockRoute = createMockRoute(createMockBlockClass(TEST_BLOCKS_MOCKS_TEMPLATES.TEST_BLOCK_MOCK_1));

      const renderSpy = sinon.spy(mockRoute, 'render');
      const mountSpy = sinon.spy(mockRoute, 'mount');

      await Router.use(
        TEST_ROUTES.TEST_ROUTE_1,
        mockRoute,
      ).start(TEST_ROUTES.TEST_ROUTE_1);

      assert.isTrue(renderSpy.calledOnce);
      assert.isTrue(mountSpy.calledOnce);

      assert.strictEqual(
        Router.rootElement?.innerHTML,
        TEST_BLOCKS_MOCKS_TEMPLATES.TEST_BLOCK_MOCK_1,
      );
    });

    it('Unmount маршрута при переходе на другой маршрут и рендер нового', async () => {
      const mockRoute1 = createMockRoute(createMockBlockClass(TEST_BLOCKS_MOCKS_TEMPLATES.TEST_BLOCK_MOCK_1));
      const mockRoute2 = createMockRoute(createMockBlockClass(TEST_BLOCKS_MOCKS_TEMPLATES.TEST_BLOCK_MOCK_2));

      const leave1Spy = sinon.spy(mockRoute1, 'leave');
      const render2Spy = sinon.spy(mockRoute2, 'render');
      const mount2Spy = sinon.spy(mockRoute2, 'mount');

      await Router.use(
        TEST_ROUTES.TEST_ROUTE_1,
        mockRoute1,
      ).use(TEST_ROUTES.TEST_ROUTE_2, mockRoute2).start(TEST_ROUTES.TEST_ROUTE_1);

      await Router.go(TEST_ROUTES.TEST_ROUTE_2);

      assert.isTrue(leave1Spy.calledOnce);

      assert.isTrue(render2Spy.calledOnce);
      assert.isTrue(mount2Spy.calledOnce);

      assert.strictEqual(
        Router.rootElement?.innerHTML,
        TEST_BLOCKS_MOCKS_TEMPLATES.TEST_BLOCK_MOCK_2,
      );
    });
  });
});
