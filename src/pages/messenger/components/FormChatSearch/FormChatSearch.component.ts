import type {
  TFormChatSearchChildren,
  TFormChatSearchProps,
  TFormChatSearchState,
} from './types';

import { Form } from '@components/Form';
import { InputSearch } from '@components/InputSearch';

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
          this.updateStateFromEvent(event, 'search');

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
