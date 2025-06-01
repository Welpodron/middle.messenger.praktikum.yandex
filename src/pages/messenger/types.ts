import type { ChatterConnector } from './components/ChatterConnector';
import type { Sidebar } from './components/Sidebar';

export type TMessengerProps = {
  title: string;
};

export type TMessengerChildren = {
  Sidebar: Sidebar;
  ChatterConnector: ChatterConnector;
};
