import type { TChat } from '@app/types/api';

import type { Avatar } from '@components/Avatar';

export type TChatChildren = {
  Avatar: Avatar;
};

export type TChatProps = TChat & {
  isActive?: boolean;
  onClick?: (chatId: string) => void;
};
