import type { TChat } from '../../../../shared/types/api';

import type { Chat } from '../Chat';

export type TChatsListChildren = {
  Chats: Chat[];
};

export type TChatsListProps = {
  onChatClick: (chatId: string) => void;
  chats: TChat[];
};
