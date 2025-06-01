import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormChatUsersAddState = {
  usersIds: string;
};

export type TFormChatUsersAddProps = TFormProps<TFormChatUsersAddState>;

export type TFormChatUsersAddChildren = {
  FieldUsersIds: FormFieldGeneric;
  ButtonAdd: Button<string[]>;
};
