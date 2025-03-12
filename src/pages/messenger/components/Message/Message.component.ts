import type { TMessageProps } from './types';

import { Block } from '@components/Block';

import template from './Message.hbs';

// TODO: После того как покажут контракты с бэка можно добавить сообщения для атачментов и статусы отправки (если они вообще есть)
export class Message extends Block<HTMLDivElement, TMessageProps> {
  constructor(props: TMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template);
  }
}
