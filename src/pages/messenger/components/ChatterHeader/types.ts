import type { TUser } from '@app/types/api';

import type { Avatar } from '@components/Avatar';

export type TChatterHeaderChildren = {
  AvatarUser: Avatar;
};

export type TChatterHeaderProps = {
  user: TUser;
};
