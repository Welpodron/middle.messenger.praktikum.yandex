import type { TChatBackgroundProps } from './types';

import { Block } from '../../../../shared/components/Block';

import template from './ChatBackground.hbs';

// TODO: В целом весьма концептуально странный компонент, можно было бы навесить style/className на родителя без реактивного апдейта (подумоть)
export class ChatBackground extends Block<TChatBackgroundProps> {
  constructor(props: TChatBackgroundProps) {
    super(props);
  }

  componentDidUpdate(oldProps: Partial<TChatBackgroundProps>, newProps: Partial<TChatBackgroundProps>) {
    if (oldProps?.isActive === newProps?.isActive) {
      return false;
    }

    return true;
  }

  render() {
    return this.compile(template);
  }
}
