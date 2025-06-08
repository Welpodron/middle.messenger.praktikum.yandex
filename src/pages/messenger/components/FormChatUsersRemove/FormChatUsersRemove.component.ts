import type {
  TFormChatUsersRemoveChildren,
  TFormChatUsersRemoveProps,
  TFormChatUsersRemoveState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconX from '@icons/x.svg?raw';

import template from './FormChatUsersRemove.hbs';
import classNames from './FormChatUsersRemove.module.scss';

export class FormChatUsersRemove extends Form<
  TFormChatUsersRemoveState,
  TFormChatUsersRemoveProps,
  TFormChatUsersRemoveChildren
> {
  constructor(props: TFormChatUsersRemoveProps) {
    super({
      ...props,
      FieldUsersIds: new FormFieldGeneric({
        labelClassName: 'sr-only',
        label: 'ID пользователя(ей)',
        name: 'usersIds',
        type: 'text',
        placeholder: 'Введите ID пользователя(eй)',
        autocomplete: 'off',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'usersIds');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonRemove: new Button({
        type: 'submit',
        isFull: true,
        isDanger: true,
        Children: ['Удалить', iconX],
        className: classNames.button,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
