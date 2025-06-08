import type { TDynamicObject } from '@app/types/utils';
import type { TBlockChildren, TBlockOptions, TBlockProps } from './types';

import Handlebars from 'handlebars';
import { EventBus } from '@modules/EventBus';
import { deepCompare } from '@utils/deepCompare';
import { log } from '@utils/log';
import { uuid } from '@utils/uuid';

import { BLOCK_EVENTS } from './constants';
import { replaceStubWithComponentInstance } from './utils/replaceStubWithComponentInstance';

export abstract class Block<
  TRootElement extends Element = Element,
  TProps extends TDynamicObject = TDynamicObject,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TChildren extends TBlockChildren = {},
> {
  private _id = uuid();

  private _element: TRootElement | null = null;

  private _eventBus = new EventBus();

  protected _name = '';

  protected _props: TBlockProps & TProps;

  children: TChildren;

  constructor(
    initialPropsWithChildren?: Partial<TBlockProps & TChildren & TProps>,
    options?: TBlockOptions,
  ) {
    this._name = options?.displayName ?? (this._name || this.constructor.name);

    this._registerEvents();

    const { props, children } = this._preparePropsWithChildren(
      initialPropsWithChildren,
    );

    this.children = children;

    this._props = this._proxyProps(props);

    this._eventBus.emit(BLOCK_EVENTS.INIT);
  }

  getContent() {
    return this._element;
  }

  getId() {
    return this._id;
  }

  init() {
    this._eventBus.emit(BLOCK_EVENTS.FLOW_RENDER);
  }

  compile(template: string) {
    const childrenStubs = Object.entries(this.children).reduce(
      (acc, [key, child]) => {
        if (Array.isArray(child)) {
          acc[key] = child.map(component =>
            component instanceof Block
              ? `<div data-id="${component.getId()}"></div>`
              : component,
          );
        }
        else if (child instanceof Block) {
          acc[key] = `<div data-id="${child.getId()}"></div>`;
        }
        else {
          acc[key] = child;
        }

        return acc;
      },
      {} as TDynamicObject,
    );

    const templateDelegate = Handlebars.compile(template);

    const compiledTemplate = templateDelegate({
      ...this._props,
      ...childrenStubs,
    });

    const templateElement = document.createElement('template');

    templateElement.innerHTML = compiledTemplate;

    const fragment = templateElement.content;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          if (component instanceof Block) {
            replaceStubWithComponentInstance({
              fragment,
              component,
            });
          }
        });
      }
      else if (child instanceof Block) {
        replaceStubWithComponentInstance({
          fragment,
          component: child,
        });
      }
    });

    return fragment;
  }

  render(): DocumentFragment {
    throw new Error(`Метод render не реализован в компоненте ${this._name}`);
  }

  protected _render() {
    log({
      module: 'BLOCK',
      message: `${this._name} RENDER`,
    });

    this._removeEventsListeners();

    const fragment = this.render();

    const root = fragment.firstElementChild;

    if (!root) {
      throw new Error(
        `Не удалось найти корневой элемент в компоненте ${this._name}`,
      );
    }

    this._element?.replaceWith(root);

    this._element = root as TRootElement;

    this._eventBus.emit(BLOCK_EVENTS.FLOW_CDR);
  }

  // LIFECYCLE
  private _componentDidRender() {
    log({
      module: 'BLOCK',
      message: `${this._name} DID RENDER`,
    });

    this.componentDidRender();

    this._addEventsListeners();
  }

  componentDidRender() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(BLOCK_EVENTS.FLOW_CDM);
  }

  componentDidMount() {}

  private _componentDidMount() {
    log({
      module: 'BLOCK',
      message: `${this._name} DID MOUNT`,
    });

    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          if (component instanceof Block) {
            component.dispatchComponentDidMount();
          }
        });
      }
      else if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(
    oldProps: Partial<TProps>,
    newProps: Partial<TProps>,
    oldChildren: TBlockChildren,
    newChildren: TBlockChildren,
  ) {
    const response = this.componentDidUpdate(
      oldProps,
      newProps,
      oldChildren,
      newChildren,
    );

    if (!response) {
      return;
    }

    this._eventBus.emit(BLOCK_EVENTS.FLOW_RENDER);
  }

  dispatchComponentWillUnmount() {
    this._eventBus.emit(BLOCK_EVENTS.FLOW_CWU);
  }

  componentWillUnmount() {}

  private _componentWillUnmount() {
    this._unmountChildren();

    log({
      module: 'BLOCK',
      message: `${this._name} WILL UNMOUNT`,
    });

    this.componentWillUnmount();

    this._removeEventsListeners();

    this._eventBus.clear();

    this._element?.remove();

    this._element = null;
  }

  private _unmountChildren() {
    Object.keys(this.children).forEach((name) => {
      this._unmountChild(name as keyof TChildren);
    });
  }

  private _unmountChild(name: keyof TChildren) {
    const child = this.children[name];

    if (Array.isArray(child)) {
      child.forEach((component) => {
        if (component instanceof Block) {
          component.dispatchComponentWillUnmount();
        }
      });
    }
    else if (child instanceof Block) {
      child.dispatchComponentWillUnmount();
    }
  }

  // Все компоненты наследуемые от Block могут переопределить этот метод на deep compare или другой механизм сравнения
  componentDidUpdate(
    oldProps?: Partial<TProps>,
    currentProps?: Partial<TProps>,
    oldChildren?: TBlockChildren,
    currentChildren?: TBlockChildren,
  ) {
    if (deepCompare(oldProps, currentProps) && deepCompare(oldChildren, currentChildren)) {
      return false;
    }

    return true;
  }

  // EVENTS
  private _registerEvents() {
    this._eventBus.on(BLOCK_EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      BLOCK_EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    );
    this._eventBus.on(
      BLOCK_EVENTS.FLOW_CWU,
      this._componentWillUnmount.bind(this),
    );
    this._eventBus.on(
      BLOCK_EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
    this._eventBus.on(
      BLOCK_EVENTS.FLOW_CDR,
      this._componentDidRender.bind(this),
    );
    this._eventBus.on(BLOCK_EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEventsListeners() {
    const { events = {} } = this._props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element?.addEventListener(event, callback);
    });
  }

  private _removeEventsListeners() {
    const { events = {} } = this._props;

    Object.entries(events).forEach(([event, callback]) => {
      this._element?.removeEventListener(event, callback);
    });
  }

  // PROPS
  private _preparePropsWithChildren(
    initialPropsWithChildren?: Partial<TBlockProps & TChildren & TProps>,
  ) {
    const props: TDynamicObject = {};
    const children: TBlockChildren = {};

    if (typeof initialPropsWithChildren === 'object') {
      Object.entries(initialPropsWithChildren).forEach(([key, value]) => {
        if (
          Array.isArray(value)
          && value.every(item => item instanceof Block)
          && key[0] === key[0].toUpperCase()
        ) {
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

    return {
      props: props as TBlockProps & TProps,
      children: children as TChildren,
    };
  }

  private _proxyProps(props: TProps) {
    const getSelf = () => this;

    return new Proxy(props, {
      get(target, prop, receiver) {
        const propName = String(prop);

        if (propName.startsWith('_')) {
          throw new Error(
            `Обнаружена попытка обращения к приватному полю "${propName} у "${
              getSelf()._name
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
              getSelf()._name
            }"`,
          );
        }

        const oldProps = { ...target };

        Reflect.set(target, prop, value, receiver);

        // Если пропсы изменились то нужно произвести ререндер
        getSelf()._eventBus.emit(
          BLOCK_EVENTS.FLOW_CDU,
          oldProps,
          target,
          getSelf().children,
          target.children,
        );

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

    Object.assign(this._props, nextProps);
  }

  // Вызываем в didUpdate, чтобы обновить children компонента прямо перед рендером
  setChild(name: keyof TChildren, child: TChildren[keyof TChildren]) {
    this._unmountChild(name);

    this.children[name] = child;
  }

  setChildren(nextChildren: TChildren) {
    this._unmountChildren();

    this.children = nextChildren;
  }
}
