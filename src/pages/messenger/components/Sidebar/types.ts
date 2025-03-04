import type { TUser } from '../../../../shared/types/api';

import type { Link } from '../../../../shared/components/Link';
import type { Button } from '../../../../shared/components/Button';

import type { ChatsList, TChatsListProps } from '../ChatsList';
import type { FormChatSearch } from '../FormChatSearch';

export type TSidebarChildren = {
  LinkUser: Link;
  FormChatSearch: FormChatSearch;
  ButtonCreateChat: Button;
  ChatsList: ChatsList;
};

export type TSidebarProps = TChatsListProps & {
  currentUser: TUser;
  onSearch: (state: { search: string }) => void;
  onClickCreateChat: () => void;
};
