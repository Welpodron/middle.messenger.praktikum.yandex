import type { Avatar } from '@components/Avatar';
import type { Button } from '@components/Button';
import type { Drawer } from '@components/Drawer';
import type { TAppState } from '@modules/Store';
import type { FormAvatarChange } from '../FormAvatarChange';
import type { FormInfoChange } from '../FormInfoChange';
import type { FormPasswordChange } from '../FormPasswordChange';

export type TUserConnectorChildren = {
  FormInfoChange: FormInfoChange;
  ButtonAvatar: Button<Avatar>;
  ButtonChangePassword: Button<string[]>;
  ButtonLogout: Button<string[]>;
  DrawerPasswordChange: Drawer<FormPasswordChange>;
  DrawerAvatarChange: Drawer<FormAvatarChange>;
};

export type TUserConnectorProps = {
  state: {
    user: TAppState['user'];
  };
};
