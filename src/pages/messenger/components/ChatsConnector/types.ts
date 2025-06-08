import type { TAppState } from '@modules/Store';
import type { Chat } from '../Chat';

export type TChatsConnectorChildren = {
  Chats: Chat[];
};

export type TChatsConnectorProps = {
  state: {
    chats: TAppState['chats'];
    chat: TAppState['chat'];
  };
};
