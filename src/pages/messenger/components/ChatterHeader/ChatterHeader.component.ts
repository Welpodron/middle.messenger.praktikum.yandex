import type { TChatterHeaderProps, TChatterHeaderChildren } from './types';

import { Block } from '@components/Block';
import { Avatar } from '@components/Avatar';

import template from './ChatterHeader.hbs';

// TODO: После того как покажут контракты с бэка можно добавить возможность удаления чата и добавления пользователей в группу
export class ChatterHeader extends Block<HTMLDivElement, TChatterHeaderProps, TChatterHeaderChildren> {
  constructor(props: TChatterHeaderProps) {
    super({
      ...props,
      AvatarUser: new Avatar({
        picture: props.user.picture,
        alt: props.user.display_name ?? props.user.login,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
