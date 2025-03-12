import type { TChatChildren, TChatProps } from './types';

import { Block } from '@components/Block';
import { Avatar } from '@components/Avatar';

import template from './Chat.hbs';

export class Chat extends Block<HTMLButtonElement, TChatProps, TChatChildren> {
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
    });
  }

  // Не апдейтим пропсы, а делаем toggle атрибута, чтобы избежать ререндера всего компонента
  toggle(isActive: boolean) {
    if (isActive) {
      this.getContent()?.setAttribute('data-active', '');
    }
    else {
      this.getContent()?.removeAttribute('data-active');
    }
  }

  render() {
    return this.compile(template);
  }
}
