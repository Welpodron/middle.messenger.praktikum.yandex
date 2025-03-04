import type {
  TFormChatCreateChildren,
  TFormChatCreateProps,
  TFormChatCreateState,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { Button } from '../../../../shared/components/Button';
import { FormField } from '../../../../shared/components/FormField';

import classNames from './FormChatCreate.module.scss';

import template from './FormChatCreate.hbs';

export class FormChatCreate extends Form<
  TFormChatCreateState,
  TFormChatCreateProps,
  TFormChatCreateChildren
> {
  constructor(props: TFormChatCreateProps) {
    super({
      ...props,
      InputLogin: new FormField({
        labelClassName: 'sr-only',
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        autocomplete: 'off',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            login: value,
          });
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      ButtonCreate: new Button({
        type: 'submit',
        isFull: true,
        className: classNames.button,
        Children: 'Создать',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
