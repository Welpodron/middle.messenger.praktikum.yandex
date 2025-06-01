import type { TBlockChildrenTypes } from '../Block';
import type { Button } from '../Button';

export type TDrawerChildren<TChildren extends TBlockChildrenTypes> = {
  Children: TChildren;
  ButtonClose: Button<string>;
};

export type TDrawerProps = {
  title: string;
  position?: 'left' | 'right' | 'bottom';
};
