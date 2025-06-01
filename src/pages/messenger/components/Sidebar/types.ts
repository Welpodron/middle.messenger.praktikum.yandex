import type { TDynamicObject } from '@app/types/utils';
import type { Button } from '@components/Button';
import type { Drawer } from '@components/Drawer';
import type { Link } from '@components/Link';
import type { ChatsConnector } from '../ChatsConnector';
import type { FormChatCreate } from '../FormChatCreate';

export type TSidebarChildren = {
  LinkUser: Link<string[]>;
  ButtonChatCreate: Button<string[]>;
  DrawerChatCreate: Drawer<FormChatCreate>;
  ChatsConnector: ChatsConnector;
};

export type TSidebarProps = TDynamicObject;
