import type { TChatterBoxChildren, TChatterBoxProps } from './types';

import { Block } from '../../../../shared/components/Block';

import { ChatterHeader } from '../ChatterHeader';
import { Conversation } from '../Conversation';
import { FormMessage } from '../FormMessage';

import template from './ChatterBox.hbs';

// TODO: После того как покажут контракты с бэка можно добавить форму загрузки атачментов
export class ChatterBox extends Block<TChatterBoxProps, TChatterBoxChildren> {
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
        initialState: {
          message: '',
        },
        onSubmit: async (state) => {
          console.log(state);
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
