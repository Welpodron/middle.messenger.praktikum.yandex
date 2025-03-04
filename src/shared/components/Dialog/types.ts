import type { TBlockChildrenTypes } from '../Block';

import type { Button } from '../Button';

export type TDialogChildren = {
  Children: TBlockChildrenTypes;
  ButtonClose: Button;
};

export type TDialogProps = {
  title: string;
};
