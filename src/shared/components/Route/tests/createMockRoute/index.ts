import type { Block } from '@components/Block';

import { Route } from '@components/Route';

class MockRoute extends Route {}

export const createMockRoute = (MockBlock: new (...args: unknown[]) => Block) => {
  return new MockRoute(MockBlock);
};
