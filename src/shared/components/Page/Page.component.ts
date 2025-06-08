import type { TDynamicObject } from '@app/types/utils';
import type { TPageChildren } from './types';

import { AlertsConnector } from '@components/AlertsConnector';

import { Block } from '../Block';

export abstract class Page<
  TRootElement extends Element,
  TProps extends TDynamicObject,
  TChildren,
> extends Block<TRootElement, TProps, TChildren & TPageChildren> {
  constructor(props: TProps & TChildren) {
    super({
      ...props,
      AlertsConnector: new AlertsConnector(),
    });
  }
}
