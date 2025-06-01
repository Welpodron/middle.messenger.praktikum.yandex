import type { TBlockOptions } from '@components/Block';
import type { TChatsConnectorChildren, TChatsConnectorProps } from './types';

import { Block } from '@components/Block';
import { ChatsController } from '@controllers/Chats';
import { connect } from '@modules/Store/utils/connect';
import { deepCompare } from '@utils/deepCompare';

import { Chat } from '../Chat';
import template from './ChatsConnector.hbs';
import { POLLING_INTERVAL } from './constants';

class _ChatsConnector extends Block<
  HTMLDivElement,
  TChatsConnectorProps,
  TChatsConnectorChildren
> {
  protected _timer?: ReturnType<typeof setInterval>;

  constructor(props: TChatsConnectorProps, options?: TBlockOptions) {
    const { chats, chat: currentChat } = props?.state ?? {};

    super(
      {
        ...props,
        Chats: chats?.map(
          chat =>
            new Chat({
              chat,
              isActive: chat.id === currentChat?.id,
            }),
        ),
      },
      options,
    );
  }

  componentDidMount() {
    ChatsController.get();

    this._timer = setInterval(() => {
      ChatsController.get();
    }, POLLING_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  componentDidUpdate(
    { state: oldState }: TChatsConnectorProps,
    { state: currentState }: TChatsConnectorProps,
  ) {
    if (deepCompare(oldState, currentState)) {
      return false;
    }

    const { chats, chat: currentChat } = currentState ?? {};

    this.setChildren({
      Chats: chats.map(
        chat =>
          new Chat({
            chat,
            isActive: chat.id === currentChat?.id,
          }),
      ),
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}

export const ChatsConnector = connect<
  HTMLDivElement,
  TChatsConnectorProps
  // TChatsConnectorChildren
>(({ chats, chat }) => ({
  state: {
    chats,
    chat,
  },
}))(_ChatsConnector);

export type ChatsConnector = InstanceType<typeof ChatsConnector>;
