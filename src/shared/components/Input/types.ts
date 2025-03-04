import type { TAwaitable } from '../../types/utils';

export type TInputProps = {
  type:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'file'
    | (string & {});
  name: string;
  value?: string;
  autocomplete?: AutoFill;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  onBlur?: (event: Event) => TAwaitable<void>;
  onChange?: (event: Event) => TAwaitable<void>;
  onInput?: (event: Event) => TAwaitable<void>;
  className?: string;
};
