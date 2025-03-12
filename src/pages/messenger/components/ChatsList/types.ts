import type { TChat } from '@app/types/api';

import type { Chat } from '../Chat';

export type TChatsListChildren = {
  Chats: Chat[];
};

export type TChatsListProps = {
  onChatClick: (chatId: string) => void;
  chats: TChat[];
};
