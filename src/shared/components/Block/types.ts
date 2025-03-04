import type { Block } from './Block.component';
import type { TDynamicObject, TEventHandler } from '../../types/utils';

export type TBlockChildrenTypes =
  | Block<TDynamicObject>
  | Block<TDynamicObject>[]
  | string;

export type TBlockProps = {
  events?: Partial<Record<keyof HTMLElementEventMap, TEventHandler>>;
};

export type TBlockChildren = Record<string, TBlockChildrenTypes>;
