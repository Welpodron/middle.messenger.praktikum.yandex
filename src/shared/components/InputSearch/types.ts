import type { Input } from '../Input/Input.component';

import type { TInputProps } from '../Input/types';

export type TInputSearchChildren = {
  Input: Input;
};

export type TInputSearchProps = Omit<TInputProps, 'type' | 'autocomplete'> & {
  label: string;
};
