import Handlebars from 'handlebars';

import type { TDynamicObject } from '../../types/utils';
import type { TBlockChildren, TBlockProps } from './types';

import { uuid } from '@utils/uuid';

import { EventBus } from '../../modules/EventBus';
import { replaceStubWithComponentInstance } from './utils/replaceStubWithComponentInstance';

/*
  TProps - пропсы компонента без children компонентов (которые перечислены в hbs), будут получены в результате _prepareProps, те this.props уже НЕ будет содержать в себе hbs компоненты
  TChildren - те самые children компоненты которые перечислены в hbs
*/
export abstract class Block<
  TRootElement extends Element = Element,
  TProps extends TDynamicObject = TDynamicObject,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TChildren extends TBlockChildren = {},
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: TRootElement | null = null;

  private _eventBus: EventBus;

  props: TBlockProps & TProps;
  children: TChildren;

  private _id: string;

  // При вызове конструктора super TProps прошивается дополнительно опциональным полем events из TBlockProps и внутренними компонентами из TChildren
  constructor(initialProps?: TBlockProps & TChildren & TProps) {
    this._id = uuid();

    this._eventBus = new EventBus();

    this._registerEvents();

    const { props, children } = this._prepareProps(initialProps);

    this.children = children;

    this.props = this._proxyProps(props);

    this._eventBus.emit(Block.EVENTS.INIT);
  }

  getContent() {
    return this._element;
  }

  getId() {
    return this._id;
  }

  init() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  compile(template: string) {
    const propsAndStubs: TDynamicObject = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (typeof child === 'string') {
        propsAndStubs[key] = child;
      }
      else {
        if (Array.isArray(child)) {
          propsAndStubs[key] = child.map(
            component => `<div data-id="${component.getId()}"></div>`,
          );
        }
        else {
          propsAndStubs[key] = `<div data-id="${child.getId()}"></div>`;
        }
      }
    });

    const templateDelegate = Handlebars.compile(template);

    const compiledTemplate = templateDelegate(propsAndStubs);

    const templateElement = document.createElement('template');

    templateElement.innerHTML = compiledTemplate;

    const fragment = templateElement.content;

    Object.values(this.children).forEach((child) => {
      if (typeof child !== 'string') {
        if (Array.isArray(child)) {
          child.forEach((component) => {
            replaceStubWithComponentInstance({
              fragment,
              component,
              constructorName: this.constructor.name,
            });
          });
        }
        else {
          replaceStubWithComponentInstance({
            fragment,
            component: child,
            constructorName: this.constructor.name,
          });
        }
      }
    });

    return fragment;
  }

  abstract render(): DocumentFragment;

  protected _render() {
    this._removeEventsListeners();

    const fragment = this.render();

    const root = fragment.firstElementChild;

    if (!root) {
      throw new Error(
        `После рендера "${this.constructor.name}" отсутствует firstElementChild`,
      );
    }

    if (this._element) {
      this._element.replaceWith(root);
    }

    this._element = root as TRootElement;

    this._addEventsListeners();
  }

  // LIFECYCLE
  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidMount() {}

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (typeof child !== 'string') {
        if (Array.isArray(child)) {
          child.forEach(component => component.dispatchComponentDidMount());
        }
        else {
          child.dispatchComponentDidMount();
        }
      }
    });
  }

  private _componentDidUpdate(
    oldProps: Partial<TProps>,
    newProps: Partial<TProps>,
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentWillUnmount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CWU);
  }

  componentWillUnmount() {};

  private _componentWillUnmount() {
    this.componentWillUnmount();

    this._removeEventsListeners();

    this._eventBus.clear();

    this._unmountChildren();

    this._element?.remove();
  }

  private _unmountChildren() {
    Object.values(this.children).forEach((child) => {
      if (typeof child !== 'string') {
        if (Array.isArray(child)) {
          child.forEach(component => component.dispatchComponentWillUnmount());
        }
        else {
          child.dispatchComponentWillUnmount();
        }
      }
    });
  }

  // Все компоненты наследуемые от Block могут переопределить этот метод на deep compare или другой механизм сравнения
  componentDidUpdate(oldProps: Partial<TProps>, newProps: Partial<TProps>) {
    if (Object.is(oldProps, newProps)) {
      return false;
    }

    return true;
  }

  // EVENTS
  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    );
    this._eventBus.on(
      Block.EVENTS.FLOW_CWU,
      this._componentWillUnmount.bind(this),
    );
    this._eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEventsListeners() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element?.addEventListener(event, callback);
    });
  }

  private _removeEventsListeners() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element?.removeEventListener(event, callback);
    });
  }

  // PROPS
  private _prepareProps(initialProps?: TProps) {
    const props: TDynamicObject = {};
    const children: TBlockChildren = {};

    if (typeof initialProps === 'object') {
      Object.entries(initialProps).forEach(([key, value]) => {
        if (Array.isArray(value) && value.every(item => item instanceof Block)) {
          children[key] = value;
        }
        else if (value instanceof Block) {
          children[key] = value;
        }
        else {
          props[key] = value;
        }
      });
    }

    return { props: props as TProps, children: children as TChildren };
  }

  private _proxyProps(props: TProps) {
    const getSelf = () => this;

    return new Proxy(props, {
      get(target, prop, receiver) {
        const propName = String(prop);

        if (propName.startsWith('_')) {
          throw new Error(
            `Обнаружена попытка обращения к приватному полю "${propName} у "${
              getSelf().constructor.name
            }"`,
          );
        }

        const value = Reflect.get(target, prop, receiver);

        return typeof value == 'function' ? value.bind(target) : value;
      },
      set(target, prop, value, receiver) {
        const propName = String(prop);

        if (propName.startsWith('_')) {
          throw new Error(
            `Обнаружена попытка изменения приватного поля "${propName}" у "${
              getSelf().constructor.name
            }"`,
          );
        }

        const oldProps = { ...target };

        Reflect.set(target, prop, value, receiver);

        // Если пропсы изменились то нужно произвести ререндер
        getSelf()._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty() {
        throw new Error(`Обнаружена попытка удаления свойства объекта`);
      },
    });
  }

  setProps(nextProps?: Partial<TProps>) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  // Специальный кейс, если нам нужно полностью обновить children компоненты
  setChildren(nextChildren: TChildren) {
    this._unmountChildren();

    this.children = nextChildren;

    // Выполняем полный ререндер если изменились children компоненты
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  };
}
