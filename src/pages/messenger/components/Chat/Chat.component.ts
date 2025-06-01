import type { TChatChildren, TChatProps } from './types';

import { Avatar } from '@components/Avatar';
import { Block } from '@components/Block';
import { Store } from '@modules/Store';

import template from './Chat.hbs';

export class Chat extends Block<HTMLButtonElement, TChatProps, TChatChildren> {
  constructor(props: TChatProps) {
    super({
      ...props,
      events: {
        click: () => {
          Store.set('chat', props.chat);
        },
      },
      Avatar: new Avatar(
        {
          picture: props.chat.avatar,
        },
        {
          displayName: 'ChatAvatar',
        },
      ),
    });
  }

  render() {
    return this.compile(template);
  }
}
