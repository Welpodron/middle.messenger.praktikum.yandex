import type { TBlockOptions } from '@components/Block';
import type {
  TChatterConnectorChildren,
  TChatterConnectorProps,
} from './types';

import { Block } from '@components/Block';
import { ChatsController } from '@controllers/Chats';
import { connect } from '@modules/Store/utils/connect';
import { deepCompare } from '@utils/deepCompare';

import { ChatterFooter } from '../ChatterFooter';
import { ChatterHeader } from '../ChatterHeader';
import { ChatterMessages } from '../ChatterMessages';
import template from './ChatterConnector.hbs';

class _ChatterConnector extends Block<
  HTMLDivElement,
  TChatterConnectorProps,
  TChatterConnectorChildren
> {
  protected _scrollPosition: number | null = null;

  constructor(props: TChatterConnectorProps, options?: TBlockOptions) {
    const { state } = props ?? {};
    const { chat, chatMessages, user } = state;

    super(
      {
        ...props,
        ChatterHeader: new ChatterHeader({
          chat,
          user,
        }),
        ChatterMessages: new ChatterMessages({
          chat,
          user,
          messages: chatMessages
            ? [...chatMessages].map(([, message]) => message)
            : [],
          onScroll: (position: number) => {
            this._scrollPosition = position;
          },
        }),
        ChatterFooter: new ChatterFooter({
          onSubmit: () => {
            this._scrollPosition = null;
          },
        }),
      },
      options,
    );
  }

  componentDidRender() {
    this.children.ChatterMessages.scroll({
      position:
        this._scrollPosition === null ? undefined : this._scrollPosition,
      placement: this._scrollPosition === null ? 'bottom' : undefined,
    });
  }

  componentDidMount() {
    const { chat, user } = this._props.state ?? {};

    if (chat?.id && user?.id) {
      ChatsController.connect({
        queryParams: { chatId: chat.id, userId: user.id },
      });
    }
  }

  componentWillUnmount() {
    ChatsController.disconnect();
    this._scrollPosition = null;
    console.error(this._scrollPosition);
  }

  componentDidUpdate(
    { state: oldState }: TChatterConnectorProps,
    { state: currentState }: TChatterConnectorProps,
  ) {
    if (deepCompare(oldState, currentState)) {
      return false;
    }

    const { chat: oldChat, user: oldUser } = oldState ?? {};
    const {
      chat: currentChat,
      chatMessages: currentMessages,
      user: currentUser,
    } = currentState ?? {};

    // Поменялась инфа по 2 основным критическим параметрам: айди чата и айди пользователя, делаем реконнект
    if (oldChat?.id !== currentChat?.id || oldUser?.id !== currentUser?.id) {
      if (currentChat?.id && currentUser?.id) {
        ChatsController.connect({
          queryParams: { chatId: currentChat.id, userId: currentUser.id },
        });
      }

      if (oldChat?.id !== currentChat?.id) {
        this._scrollPosition = null;
        this.children.ChatterFooter.children.FormChatMessage.reset();
      }
    }

    this.children.ChatterHeader.setProps({
      chat: currentChat,
      user: currentUser,
    });

    this.children.ChatterMessages.setProps({
      chat: currentChat,
      user: currentUser,
      messages: currentMessages
        ? [...currentMessages].map(([, message]) => message)
        : [],
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}

export const ChatterConnector = connect<
  HTMLDivElement,
  TChatterConnectorProps
  // TChatterConnectorChildren
>(({ chat, chatsMessages, user }) => {
  return {
    state: {
      user,
      chat,
      chatMessages:
        (chat?.id ? chatsMessages?.[chat.id] : new Map()) ?? new Map(),
    },
  };
})(_ChatterConnector);

export type ChatterConnector = InstanceType<typeof ChatterConnector>;
