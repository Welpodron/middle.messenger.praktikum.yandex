import type { TAppState } from '@modules/Store';
import type { Alert } from '../Alert';

export type TAlertsConnectorChildren = {
  Alerts: Alert[];
};

export type TAlertsConnectorProps = {
  state: {
    alerts: TAppState['alerts'];
  };
};
