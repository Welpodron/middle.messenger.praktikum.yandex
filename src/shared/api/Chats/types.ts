import type { TChat, TChatUser } from '@app/types/api';

// /chats (POST - create chat)

export type TCreateChatRequestParams = {
  title: string;
};

export type TCreateChatResponseData = {
  id: number;
};

//

export type TGetChatsRequestParams = void;

export type TGetChatsResponseData = TChat[];

//

export type TGetChatTokenRequestParams = {
  chatId: number;
  signal?: AbortSignal;
};

export type TGetChatTokenResponseData = {
  token: string;
};

//

export type TGetChatUnreadCounterRequestParams = {
  chatId: number;
  signal?: AbortSignal;
};

export type TGetChatUnreadCounterResponseData = {
  unread_count: number;
};

// chats/${chatId}/users

export type TChatUsersGetRequestParams = {
  chatId: number;
  signal?: AbortSignal;
};

export type TChatUsersGetResponseData = TChatUser[];

// chats/users

export type TChatUsersAddRequestParams = {
  users: number[];
  chatId: number;
};

export type TChatUsersAddResponseData = void;

export type TChatUsersRemoveRequestParams = {
  users: number[];
  chatId: number;
};

export type TChatUsersRemoveResponseData = void;
