// Потенциальные типы ответов от сервера
// TODO: заменить когда будет известно что реально отдают ручки с бэка

export type TUser = {
  id: string;
  login: string;
  email: string;
  phone: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  picture?: string;
};

export type TMessage = {
  id: string;
  content: string;
  time: string;
  author: TUser;
};

export type TChat = {
  id: string;
  title: string;
  picture?: string;
  unread_counter?: number;
  last_message: TMessage;
  messages: TMessage[];
};
