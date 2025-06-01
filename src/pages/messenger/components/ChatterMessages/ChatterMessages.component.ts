import type { TChatterMessagesChildren, TChatterMessagesProps } from './types';

import { Block } from '@components/Block';
import { Button } from '@components/Button';
import { ChatsController } from '@controllers/Chats';
import iconChevronDown from '@icons/chevron-down.svg?raw';
import iconChevronUp from '@icons/chevron-up.svg?raw';
import { deepCompare } from '@utils/deepCompare';

import { ChatterMessage } from '../ChatterMessage';
import template from './ChatterMessages.hbs';
import classNames from './ChatterMessages.module.scss';

export class ChatterMessages extends Block<
  HTMLDivElement,
  TChatterMessagesProps,
  TChatterMessagesChildren
> {
  constructor(props: TChatterMessagesProps) {
    const { messages = [], user } = props ?? {};

    super({
      ...props,
      ChatterMessages: messages.map(
        message =>
          new ChatterMessage({ message, isMine: message.user_id === user?.id }),
      ),
      ButtonOld: new Button({
        type: 'button',
        Children: ['К предыдущим', iconChevronUp],
        className: classNames.button,
        onClick: () => {
          this.scroll({ placement: 'top' });

          if (this._props.chat?.id) {
            ChatsController.getMessages({
              chatId: this._props.chat.id,
            });
          }
        },
      }),
      ButtonLast: new Button({
        type: 'button',
        Children: ['К последним', iconChevronDown],
        className: classNames.button,
        onClick: () => {
          this.scroll({ placement: 'bottom' });

          if (this._props.chat?.id) {
            ChatsController.getMessages({
              chatId: this._props.chat.id,
              offset: 0,
            });
          }
        },
      }),
      events: {
        scroll: () => {
          this._props.onScroll?.(
            this.getContent()?.scrollTop ?? 0,
          );
        },
      },
    });
  }

  componentDidUpdate(
    oldProps: Partial<TChatterMessagesProps>,
    newProps: Partial<TChatterMessagesProps>,
  ) {
    if (deepCompare(oldProps, newProps)) {
      return false;
    }

    const { messages = [], user } = newProps ?? {};

    this.setChild('ChatterMessages', messages.map(
      message =>
        new ChatterMessage({ message, isMine: message.user_id === user?.id }),
    ));

    return true;
  }

  scroll({ position, placement }: { position?: number; placement?: 'top' | 'bottom' }) {
    const element = this.getContent();

    if (element) {
      if (placement === 'top') {
        element.scrollTop = 0;
      }
      else if (placement === 'bottom') {
        element.scrollTop = element.scrollHeight;
      }
      else if (position !== undefined) {
        element.scrollTop = position;
      }
    }
  }

  render() {
    return this.compile(template);
  }
}
