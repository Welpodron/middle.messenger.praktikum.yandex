import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormChatUsersRemoveState = {
  usersIds: string;
};

export type TFormChatUsersRemoveProps = TFormProps<TFormChatUsersRemoveState>;

export type TFormChatUsersRemoveChildren = {
  FieldUsersIds: FormFieldGeneric;
  ButtonRemove: Button<string[]>;
};
