import type { TUser } from '../../../../shared/types/api';

import type { Avatar } from '../../../../shared/components/Avatar';

export type TChatterHeaderChildren = {
  AvatarUser: Avatar;
};

export type TChatterHeaderProps = {
  user: TUser;
};
