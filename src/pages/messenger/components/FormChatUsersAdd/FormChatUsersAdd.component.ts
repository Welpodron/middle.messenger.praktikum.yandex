import type {
  TFormChatUsersAddChildren,
  TFormChatUsersAddProps,
  TFormChatUsersAddState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconPlus from '@icons/plus.svg?raw';

import template from './FormChatUsersAdd.hbs';
import classNames from './FormChatUsersAdd.module.scss';

export class FormChatUsersAdd extends Form<
  TFormChatUsersAddState,
  TFormChatUsersAddProps,
  TFormChatUsersAddChildren
> {
  constructor(props: TFormChatUsersAddProps) {
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
      ButtonAdd: new Button({
        type: 'submit',
        isFull: true,
        Children: ['Добавить', iconPlus],
        className: classNames.button,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
