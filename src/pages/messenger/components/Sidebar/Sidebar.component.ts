import type { TSidebarChildren, TSidebarProps } from './types';

import { Block } from '@components/Block';
import { Link } from '@components/Link';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { ChatsList } from '../ChatsList';
import { FormChatSearch } from '../FormChatSearch';

import iconPlus from '@icons/plus.svg?raw';

import classNames from './Sidebar.module.scss';

import template from './Sidebar.hbs';

export class Sidebar extends Block<HTMLElement, TSidebarProps, TSidebarChildren> {
  // TODO: В целом в проекте у большинства компонентов в прокси залетают лишние пропсы, которые по факту принадлежат children, а не самому компоненту, нужно в целом пофиксить эту историю
  constructor(props: TSidebarProps) {
    super({
      ...props,
      LinkUser: new Link({
        url: '/settings',
        Children: new Avatar({
          picture: props.currentUser.picture,
        }),
      }),
      ChatsList: new ChatsList({
        chats: props.chats,
        onChatClick: props.onChatClick,
      }),
      FormChatSearch: new FormChatSearch({
        onSubmit: props.onSearch,
      }),
      ButtonCreateChat: new Button({
        type: 'button',
        Children: iconPlus,
        className: classNames.buttonCreateChat,
        onClick: props.onClickCreateChat,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
