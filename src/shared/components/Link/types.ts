import type { TBlockChildrenTypes } from '../Block';

export type TLinkChildren<TChildren extends TBlockChildrenTypes> = {
  Children: TChildren;
};

export type TLinkProps = {
  url: string;
  className?: string;
};
