import type { TFormProps } from '@components/Form';
import type { InputSearch } from '@components/InputSearch';

export type TFormChatSearchState = {
  search: string;
};

export type TFormChatSearchProps = TFormProps<TFormChatSearchState>;

export type TFormChatSearchChildren = {
  InputSearchChat: InputSearch;
};
