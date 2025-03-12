import type { Block } from './Block.component';
import type { TDynamicObject, TEventHandler } from '../../types/utils';

export type TBlockChildrenTypes<TElement extends Element = Element> =
  | Block<TElement, TDynamicObject>
  | Block<TElement, TDynamicObject>[]
  | string;

export type TBlockProps = {
  events?: Partial<Record<keyof HTMLElementEventMap, TEventHandler>>;
};

export type TBlockChildren = Record<string, TBlockChildrenTypes>;
