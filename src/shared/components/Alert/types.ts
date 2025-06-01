import type { TAlert } from '@app/types/general';
import type { Button } from '@components/Button';

export type TAlertProps = {
  alert: TAlert;
};

export type TAlertChildren = {
  ButtonClose: Button<string>;
};
