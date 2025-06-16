import type { TDynamicObject } from '@app/types/utils';
import type { TBlockChildren } from '@components/Block';

import { Block } from '@components/Block';

export const createMockBlockClass = <
  TRootElement extends Element = Element,
  TProps extends TDynamicObject = TDynamicObject,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TChildren extends TBlockChildren = {},
>(
  template: string = '<div></div>',
) => {
  return class MockBlock extends Block<TRootElement, TProps, TChildren> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
    }

    render() {
      return this.compile(template);
    }
  };
};
