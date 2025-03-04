import type { TAwaitable } from '../../types/utils';

import type { TBlockChildrenTypes } from '../Block';

export type TButtonChildren = {
  Children: TBlockChildrenTypes;
};

export type TButtonProps = {
  type: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  isFull?: boolean;
  isRound?: boolean;
  isDanger?: boolean;
  className?: string;
  onClick?: () => TAwaitable<void>;
};
