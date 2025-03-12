import type { TChat, TUser } from '@app/types/api';

import type { Dialog } from '@components/Dialog';
import type { Chatter } from './components/Chatter';
import type { Sidebar } from './components/Sidebar';

export type TMessengerProps = {
  title: string;
  // TODO: как я понял эта штука уедет в оберточный стор типа hocа, который обернет компонент и будет отдавать ему данные???
  chats: TChat[];
  currentUser: TUser;
};

export type TMessengerChildren = {
  Sidebar: Sidebar;
  Chatter: Chatter;
  DialogCreateChat: Dialog;
};
