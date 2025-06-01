import type { ErrorText } from '../ErrorText';
import type { Inputable } from '../Inputable';

export type TValidatableChildren<TInput extends Inputable> = {
  ErrorText: ErrorText;
  Input: TInput;
};

export type TValidatableProps<TValue> = {
  error?: string;
  validation?: {
    test: (value: TValue) => boolean;
    message: string;
  };
};
