import type { TMessage } from '../../../../shared/types/api';

export type TMessageProps = TMessage & {
  isMine?: boolean;
};
