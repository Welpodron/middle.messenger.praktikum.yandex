export type TUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type TChatUser = Omit<TUser, 'email' | 'phone'> & {
  role: 'admin' | 'regular';
};

export type TLastMessage = {
  id: string;
  content: string;
  time: string;
  user?: TUser;
};

export type TMessage = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: string | null;
};

export type TChat = {
  id: number;
  created_by: number;
  title: string;
  avatar: string | null;
  unread_counter: number;
  last_message: TLastMessage | null;
};
