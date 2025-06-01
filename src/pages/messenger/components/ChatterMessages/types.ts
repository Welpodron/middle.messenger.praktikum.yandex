import type { TChat, TMessage, TUser } from '@app/types/api';
import type { Button } from '@components/Button';
import type { ChatterMessage } from '../ChatterMessage';

export type TChatterMessagesChildren = {
  ChatterMessages: ChatterMessage[];
  ButtonOld: Button<string[]>;
  ButtonLast: Button<string[]>;
};

export type TChatterMessagesProps = {
  messages?: TMessage[];
  user?: TUser;
  chat?: TChat;
  onScroll?: (position: number) => void;
};
