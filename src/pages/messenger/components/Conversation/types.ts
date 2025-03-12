import type { TMessage, TUser } from '@app/types/api';

import type { Message } from '../Message';

export type TConversationChildren = {
  Messages: Message[];
};

export type TConversationProps = {
  currentUser: TUser;
  messages: TMessage[];
};
