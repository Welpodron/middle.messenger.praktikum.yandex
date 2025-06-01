import type { FormChatMessage } from '../FormChatMessage';

export type TChatterFooterChildren = {
  FormChatMessage: FormChatMessage;
};

export type TChatterFooterProps = {
  onSubmit?: () => void;
};
