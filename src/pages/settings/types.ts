import type { Link } from '@components/Link';
import type { UserConnector } from './components/UserConnector';

export type TSettingsProps = {
  title: string;
};

export type TSettingsChildren = {
  LinkBack: Link<string>;
  UserConnector: UserConnector;
};
