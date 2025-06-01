import type { TAppState } from '@modules/Store';
import type { ChatterFooter } from '../ChatterFooter';
import type { ChatterHeader } from '../ChatterHeader';
import type { ChatterMessages } from '../ChatterMessages';

export type TChatterConnectorChildren = {
  ChatterHeader: ChatterHeader;
  ChatterMessages: ChatterMessages;
  ChatterFooter: ChatterFooter;
};

export type TChatterConnectorProps = {
  state: Pick<TAppState, 'chat' | 'user'> & {
    chatMessages: TAppState['chatsMessages'][string];
  };
};
