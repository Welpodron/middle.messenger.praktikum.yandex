import type { TAwaitable } from '../../types/utils';
import type { TBlockChildrenTypes } from '../Block';

export type TButtonChildren<TChildren extends TBlockChildrenTypes> = {
  Children: TChildren;
};

export type TButtonProps = {
  type: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  isLoading?: boolean;
  isFull?: boolean;
  isRound?: boolean;
  isDanger?: boolean;
  isSquare?: boolean;
  className?: string;
  onClick?: (event: MouseEvent) => TAwaitable<void>;
};
