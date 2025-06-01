import type { TDynamicObject } from '@app/types/utils';
import type { Block, TBlockOptions } from '@components/Block';
import type { TAppState } from '@modules/Store';

import { Store } from '@modules/Store';
import { STORE_EVENTS } from '@modules/Store/constants';
import { deepCompare } from '@utils/deepCompare';

// aka redux connect https://react-redux.js.org/api/connect
export const connect = <
  TRootElement extends Element,
  TProps extends TDynamicObject,
>(
  mapStateToProps: (state: TAppState) => Partial<TProps>,
) => {
  const build = (
    Component: new (props: TProps, options?: TBlockOptions) => Block<
      TRootElement,
      TProps
    >,
  ) => {
    class ConnectedToStoreComponent extends Component {
      constructor(props?: Partial<TProps>, options?: TBlockOptions) {
        const state = mapStateToProps(Store.state);

        super({ ...props, ...state } as TProps, options);

        this.onStoreUpdate = this.onStoreUpdate.bind(this);

        Store.on(STORE_EVENTS.FLOW_SDU, this.onStoreUpdate);
      }

      onStoreUpdate(prevState: TAppState, nextState: TAppState) {
        const prevProps = mapStateToProps(prevState);
        const nextProps = mapStateToProps(nextState);

        if (deepCompare(prevProps, nextProps)) {
          return;
        }

        this.setProps(nextProps);
      }

      componentWillUnmount() {
        Store.off(STORE_EVENTS.FLOW_SDU, this.onStoreUpdate);

        super.componentWillUnmount();
      }
    }

    return ConnectedToStoreComponent as new (
      props?: Partial<TProps>,
      options?: TBlockOptions
    ) => Block<TRootElement, TProps>;
  };

  return build;
};
