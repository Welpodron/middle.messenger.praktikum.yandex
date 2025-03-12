import type { TChat } from '@app/types/api';
import type { ChatterBox } from '../ChatterBox';

export type TChatterChildren = {
  ChatterBox?: ChatterBox;
};

export type TChatterProps = {
  activeChat?: TChat;
};
