import type { TBlockOptions } from '@components/Block';
import type { TAlertsConnectorChildren, TAlertsConnectorProps } from './types';

import { Alert } from '@components/Alert';
import { Block } from '@components/Block';
import { connect } from '@modules/Store/utils/connect';
import { deepCompare } from '@utils/deepCompare';

import template from './AlertsConnector.hbs';

class _AlertsConnector extends Block<
  HTMLDivElement,
  TAlertsConnectorProps,
  TAlertsConnectorChildren
> {
  constructor(props: TAlertsConnectorProps, options?: TBlockOptions) {
    const { alerts } = props?.state ?? {};

    super(
      {
        ...props,
        Alerts: alerts?.map(
          alert =>
            new Alert({
              alert,
            }),
        ),
      },
      options,
    );
  }

  componentDidUpdate(
    { state: oldState }: TAlertsConnectorProps,
    { state: currentState }: TAlertsConnectorProps,
  ) {
    if (deepCompare(oldState, currentState)) {
      return false;
    }

    const { alerts } = currentState ?? {};

    this.setChildren({
      Alerts: alerts.map(
        alert =>
          new Alert({
            alert,
          }),
      ),
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}

export const AlertsConnector = connect<HTMLDivElement, TAlertsConnectorProps>(
  ({ alerts }) => ({
    state: {
      alerts,
    },
  }),
)(_AlertsConnector);

export type AlertsConnector = InstanceType<typeof AlertsConnector>;
