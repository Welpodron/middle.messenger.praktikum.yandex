import type { TChatterHeaderProps, TChatterHeaderChildren } from './types';

import { Block } from '../../../../shared/components/Block';
import { Avatar } from '../../../../shared/components/Avatar';

import template from './ChatterHeader.hbs';

// TODO: После того как покажут контракты с бэка можно добавить возможность удаления чата и добавления пользователей в группу
export class ChatterHeader extends Block<TChatterHeaderProps, TChatterHeaderChildren> {
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
