import type { TChatterBoxChildren, TChatterBoxProps } from './types';

import { Block } from '@components/Block';

import { ChatterHeader } from '../ChatterHeader';
import { Conversation } from '../Conversation';
import { FormMessage } from '../FormMessage';

import template from './ChatterBox.hbs';

// TODO: После того как покажут контракты с бэка можно добавить форму загрузки атачментов
export class ChatterBox extends Block<HTMLDivElement, TChatterBoxProps, TChatterBoxChildren> {
  constructor(props: TChatterBoxProps) {
    super({
      ...props,
      ChatterHeader: new ChatterHeader({
        user: props.chat.last_message.author,
      }),
      Conversation: new Conversation({
        currentUser: props.currentUser,
        messages: props.chat.messages,
      }),
      FormMessage: new FormMessage({
        onSubmit: async (state) => {
          await this.props.onSendMessage(state.message);
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
