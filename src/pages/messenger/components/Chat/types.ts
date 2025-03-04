import type { TChat } from '../../../../shared/types/api';

import type { Avatar } from '../../../../shared/components/Avatar';
import type { ChatBackground } from '../ChatBackground';

export type TChatChildren = {
  Avatar: Avatar;
  ChatBackground: ChatBackground;
};

export type TChatProps = TChat & {
  isActive?: boolean;
  onClick?: (chatId: string) => void;
};
