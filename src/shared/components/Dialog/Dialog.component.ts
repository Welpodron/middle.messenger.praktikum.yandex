import type { TDialogChildren, TDialogProps } from './types';

import { Block } from '../Block';
import { Button } from '../Button';

import iconX from '@icons/x.svg?raw';

import classNames from './Dialog.module.scss';

import template from './Dialog.hbs';

export class Dialog extends Block<HTMLDialogElement, TDialogProps, TDialogChildren> {
  isDisabled = false;

  constructor(props: TDialogProps & Pick<TDialogChildren, 'Children'>) {
    super({
      ...props,
      ButtonClose: new Button({
        type: 'button',
        Children: iconX,
        className: classNames.buttonClose,
        onClick: () => {
          this.hide();
        },
      }),
    });
  }

  show() {
    this.getContent()?.showModal();
  }

  hide() {
    this.getContent()?.close();
  }

  render() {
    return this.compile(template);
  }
}
