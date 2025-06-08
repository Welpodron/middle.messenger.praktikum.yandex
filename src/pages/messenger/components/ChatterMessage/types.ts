import type { TMessage } from '@app/types/api';

export type TChatterMessageProps = {
  message: TMessage;
  isMine: boolean;
};
