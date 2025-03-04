import type { TUser } from '../../shared/types/api';

import type { Link } from '../../shared/components/Link';
import type { Dialog } from '../../shared/components/Dialog';

import type { FormInfoChange } from './components/FormInfoChange';

export type TSettingsChildren = {
  LinkBack: Link;
  FormInfoChange: FormInfoChange;
  DialogAvatarChange: Dialog;
  DialogPasswordChange: Dialog;
};

export type TSettingsProps = {
  title: string;
  // TODO: как я понял эта штука уедет в оберточный стор типа hocа, который обернет компонент и будет отдавать ему данные???
  currentUser: TUser;
};
