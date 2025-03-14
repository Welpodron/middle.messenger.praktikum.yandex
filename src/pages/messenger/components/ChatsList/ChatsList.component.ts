import type { TChatsListChildren, TChatsListProps } from './types';

import { Block } from '@components/Block';
import { Chat } from '../Chat';

import template from './ChatsList.hbs';

export class ChatsList extends Block<HTMLDivElement, TChatsListProps, TChatsListChildren> {
  constructor(props: TChatsListProps) {
    super({
      ...props,
      Chats: props.chats.map(chat => new Chat({ ...chat, onClick: props.onChatClick })),
    });
  }

  render() {
    return this.compile(template);
  }
}
