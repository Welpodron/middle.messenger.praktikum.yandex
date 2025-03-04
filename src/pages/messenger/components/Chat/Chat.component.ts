import type { TChatChildren, TChatProps } from './types';

import { Block } from '../../../../shared/components/Block';
import { Avatar } from '../../../../shared/components/Avatar';
import { ChatBackground } from '../ChatBackground';

import template from './Chat.hbs';

export class Chat extends Block<TChatProps, TChatChildren> {
  constructor(props: TChatProps) {
    super({
      ...props,
      events: {
        click: () => {
          // TODO: По факту мб можно прокидывать наверх не айди, а весь чат обратно
          this.props.onClick?.(this.props.id);
        },
      },
      Avatar: new Avatar({
        picture: props.picture,
      }),
      ChatBackground: new ChatBackground({
        isActive: props.isActive,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
