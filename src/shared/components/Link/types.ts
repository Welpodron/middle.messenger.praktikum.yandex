import type { TBlockChildrenTypes } from '../Block';

export type TLinkChildren = {
  Children: TBlockChildrenTypes;
};

export type TLinkProps = {
  url: string;
  className?: string;
};
