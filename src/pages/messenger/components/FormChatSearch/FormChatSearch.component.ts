import type {
  TFormChatSearchChildren,
  TFormChatSearchProps,
  TFormChatSearchState,
} from './types';

import { Form } from '../../../../shared/components/Form';
import { InputSearch } from '../../../../shared/components/InputSearch';

import classNames from './FormChatSearch.module.scss';

import template from './FormChatSearch.hbs';

export class FormChatSearch extends Form<
  TFormChatSearchState,
  TFormChatSearchProps,
  TFormChatSearchChildren
> {
  constructor(props: TFormChatSearchProps) {
    super({
      ...props,
      InputSearchChat: new InputSearch({
        name: 'search',
        placeholder: 'Поиск',
        label: 'Поиск чата',
        onInput: async (event) => {
          const value = (event.target as HTMLInputElement).value;

          this.setState({
            ...this.state,
            search: value,
          });

          await this.props.onSubmit(this.state);
        },
        className: classNames.inputSearch,
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
