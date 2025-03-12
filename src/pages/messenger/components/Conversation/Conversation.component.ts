import type { TConversationChildren, TConversationProps } from './types';

import { Block } from '@components/Block';
import { Message } from '../Message';

import template from './Conversation.hbs';

export class Conversation extends Block<HTMLUListElement, TConversationProps, TConversationChildren> {
  constructor(props: TConversationProps) {
    super({
      ...props,
      Messages: props.messages.map(message => new Message({
        ...message,
        isMine: message.author.id === props.currentUser.id,
      })),
    });
  }

  render() {
    return this.compile(template);
  }
}
