import type { TFormProps } from '../../../../shared/components/Form';
import type { InputSearch } from '../../../../shared/components/InputSearch';

export type TFormChatSearchState = {
  search: string;
};

export type TFormChatSearchProps = TFormProps<TFormChatSearchState>;

export type TFormChatSearchChildren = {
  InputSearchChat: InputSearch;
};
