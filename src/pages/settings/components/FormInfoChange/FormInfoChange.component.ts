import type {
  TFormInfoChangeChildren,
  TFormInfoChangeProps,
  TFormInfoChangeState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import iconEdit from '@icons/edit.svg?raw';
import { deepCompare } from '@utils/deepCompare';

import template from './FormInfoChange.hbs';

export class FormInfoChange extends Form<
  TFormInfoChangeState,
  TFormInfoChangeProps,
  TFormInfoChangeChildren
> {
  constructor(props: TFormInfoChangeProps) {
    const { initialState } = props;

    super({
      ...props,
      FieldEmail: new FormFieldGeneric({
        label: 'Почта',
        name: 'email',
        type: 'email',
        placeholder: 'pochta@yandex.ru',
        autocomplete: 'email',
        value: initialState?.email,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'email');
        },
        validation: COMMON_VALIDATIONS.email,
      }),
      FieldLogin: new FormFieldGeneric({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
        value: initialState?.login,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'login');
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      FieldFirstName: new FormFieldGeneric({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'given-name',
        value: initialState?.first_name,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'first_name');
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      FieldSecondName: new FormFieldGeneric({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Иванов',
        autocomplete: 'family-name',
        value: initialState?.second_name,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'second_name');
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      FieldDisplayName: new FormFieldGeneric({
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'username',
        value: initialState?.display_name ?? '',
        onChange: (event) => {
          this.updateStateFromEvent(event, 'display_name');
        },
      }),
      FieldPhone: new FormFieldGeneric({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: '+7 (909) 967 30 30',
        autocomplete: 'tel',
        value: initialState?.phone,
        onChange: (event) => {
          this.updateStateFromEvent(event, 'phone');
        },
        validation: COMMON_VALIDATIONS.phone,
      }),
      ButtonChangeInfo: new Button({
        type: 'submit',
        Children: ['Изменить данные', iconEdit],
      }),
    });
  }

  componentDidUpdate(oldProps: TFormInfoChangeProps, currentProps: TFormInfoChangeProps) {
    if (deepCompare(oldProps, currentProps)) {
      return false;
    }

    const { user } = currentProps;

    this.setState({
      email: user?.email ?? '',
      login: user?.login ?? '',
      first_name: user?.first_name ?? '',
      second_name: user?.second_name ?? '',
      display_name: user?.display_name ?? '',
      phone: user?.phone ?? '',
    });

    this.children.FieldDisplayName.setProps({
      value: user?.display_name ?? '',
    });

    this.children.FieldEmail.setProps({
      value: user?.email,
    });

    this.children.FieldLogin.setProps({
      value: user?.login,
    });

    this.children.FieldFirstName.setProps({
      value: user?.first_name,
    });

    this.children.FieldSecondName.setProps({
      value: user?.second_name,
    });

    this.children.FieldPhone.setProps({
      value: user?.phone,
    });

    return true;
  }

  render() {
    return this.compile(template);
  }
}
