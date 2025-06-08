import type { TChat, TChatUser, TMessage, TUser } from '@app/types/api';
import type { TAlert } from '@app/types/general';

export type TAppState = {
  user?: TUser;
  chats: TChat[];
  chat?: TChat;
  chatsUsers: Record<string, TChatUser[]>;
  chatsMessages: Record<string, Map<number, TMessage>>;
  alerts: TAlert[];
};
