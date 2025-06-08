import type { TBlockChildrenTypes } from '../Block';
import type { TDrawerChildren, TDrawerProps } from './types';

import iconX from '@icons/x.svg?raw';

import { Block } from '../Block';
import { Button } from '../Button';
import template from './Drawer.hbs';
import classNames from './Drawer.module.scss';

export class Drawer<TChildren extends TBlockChildrenTypes> extends Block<
  HTMLDialogElement,
  TDrawerProps,
  TDrawerChildren<TChildren>
> {
  constructor(props: TDrawerProps & Pick<TDrawerChildren<TChildren>, 'Children'>) {
    super({
      position: 'right',
      ButtonClose: new Button({
        type: 'button',
        Children: iconX,
        className: classNames.buttonClose,
        onClick: () => {
          this.close();
        },
      }),
      ...props,
    });
  }

  open() {
    this.getContent()?.showModal();
  }

  close() {
    this.getContent()?.close();
  }

  render() {
    return this.compile(template);
  }
}
