import type { TDynamicObject } from '../../types/utils';
import type { TBlockChildren, TBlockProps } from '../Block';

import { Block } from '../Block';

export abstract class Inputable<
  TValue = string,
  TRootElement extends Element = Element,
  TProps extends TDynamicObject = TDynamicObject,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TChildren extends TBlockChildren = {},
> extends Block<TRootElement, TProps, TChildren> {
  constructor(props: TBlockProps & TProps & TChildren) {
    super(props);
  }

  abstract get value(): TValue;
}
