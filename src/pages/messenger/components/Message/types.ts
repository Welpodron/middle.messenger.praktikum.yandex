import type { TMessage } from '@app/types/api';

export type TMessageProps = TMessage & {
  isMine?: boolean;
};
