import type { TChatterFooterChildren, TChatterFooterProps } from './types';

import { Block } from '@components/Block';
import { ChatsController } from '@controllers/Chats';

import { FormChatMessage } from '../FormChatMessage';
import template from './ChatterFooter.hbs';

export class ChatterFooter extends Block<
  HTMLDivElement,
  TChatterFooterProps,
  TChatterFooterChildren
> {
  constructor(props: TChatterFooterProps) {
    super({
      ...props,
      FormChatMessage: new FormChatMessage({
        onSubmit: (state) => {
          this.children.FormChatMessage.reset();
          ChatsController.sendMessage(state.message);
          this._props.onSubmit?.();
        },
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
