import type { TDynamicObject, TEventHandler } from '../../types/utils';
import type { Block } from './Block.component';

export type TBlockChildrenTypes<TElement extends Element = Element> =
  | Block<TElement, TDynamicObject>
  | Array<Block<TElement, TDynamicObject> | string>
  | string;

export type TBlockProps = {
  events?: Partial<Record<keyof HTMLElementEventMap, TEventHandler>>;
};

export type TBlockOptions = {
  displayName?: string;
};

export type TBlockChildren = Record<string, TBlockChildrenTypes>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TBlockPropsWithChildren<TChildren extends TBlockChildren = {}> = {
  children: TChildren;
} & TDynamicObject;
