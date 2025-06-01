import type { TAwaitable } from '../../types/utils';
import type { ErrorText } from '../ErrorText';

export type TFormChildren = {
  ErrorText: ErrorText;
};

export type TFormProps<TFormState> = {
  initialState?: TFormState;
  error?: string;
  onSubmit: (state: TFormState) => TAwaitable<void>;
};
