import type { TChat, TUser } from '../../../../shared/types/api';

import type { ChatterHeader } from '../ChatterHeader';
import type { Conversation } from '../Conversation';
import type { FormMessage } from '../FormMessage';

export type TChatterBoxChildren = {
  ChatterHeader: ChatterHeader;
  Conversation: Conversation;
  FormMessage: FormMessage;
};

export type TChatterBoxProps = {
  currentUser: TUser;
  chat: TChat;
};
