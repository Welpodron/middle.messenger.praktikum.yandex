import type { TBlockOptions } from '../Block';
import type { TAlertChildren, TAlertProps } from './types';

import { Button } from '@components/Button';
import iconX from '@icons/x.svg?raw';
import { Store } from '@modules/Store';

import { Block } from '../Block';
import template from './Alert.hbs';
import classNames from './Alert.module.scss';

export class Alert extends Block<HTMLDivElement, TAlertProps, TAlertChildren> {
  constructor(props: TAlertProps, options?: TBlockOptions) {
    super(
      {
        ...props,
        ButtonClose: new Button({
          type: 'button',
          Children: iconX,
          className: classNames.buttonClose,
          onClick: () => {
            Store.set('alerts', Store.get('alerts').filter(alert => alert.id !== this._props.alert.id));
          },
        }),
      },
      options,
    );
  }

  render() {
    return this.compile(template);
  }
}
