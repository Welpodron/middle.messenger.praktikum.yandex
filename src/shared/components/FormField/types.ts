import type { ErrorText, TErrorTextProps } from '../ErrorText';
import type { Input, TInputProps } from '../Input';

export type TFormFieldChildren = {
  Input: Input;
  ErrorText: ErrorText;
};

export type TFormFieldProps = TErrorTextProps & TInputProps & {
  label: string;
  validation?: {
    test: (value: string) => boolean;
    message: string;
  };
  labelClassName?: string;
  inputClassName?: string;
};
