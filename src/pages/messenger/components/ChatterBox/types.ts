import type { TChat, TUser } from '@app/types/api';
import type { TAwaitable } from '@app/types/utils';

import type { ChatterHeader } from '../ChatterHeader';
import type { Conversation } from '../Conversation';
import type { FormMessage } from '../FormMessage';

export type TChatterBoxChildren = {
  ChatterHeader: ChatterHeader;
  Conversation: Conversation;
  FormMessage: FormMessage;
};

export type TChatterBoxProps = {
  onSendMessage: (message: string) => TAwaitable<void>;
  currentUser: TUser;
  chat: TChat;
};
