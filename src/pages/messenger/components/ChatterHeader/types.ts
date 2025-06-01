import type { TChat, TUser } from '@app/types/api';
import type { Avatar } from '@components/Avatar';
import type { Button } from '@components/Button';
import type { Drawer } from '@components/Drawer';
import type { FormChatUsersAdd } from '../FormChatUsersAdd';
import type { FormChatUsersRemove } from '../FormChatUsersRemove';

export type TChatterHeaderChildren = {
  AvatarChat: Avatar;
  ButtonChatActions: Button<string>;
  DrawerChatActions: Drawer<Button<string[]>[]>;
  DrawerChatUsersAdd: Drawer<FormChatUsersAdd>;
  DrawerChatUsersRemove: Drawer<FormChatUsersRemove>;
};

export type TChatterHeaderProps = {
  chat?: TChat;
  user?: TUser;
};
