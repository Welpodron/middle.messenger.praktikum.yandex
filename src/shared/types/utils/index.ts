// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback<TArgs extends any[], TReturn> = (...args: TArgs) => TReturn;

export type TAwaitable<TReturn> = TReturn | Promise<TReturn>;

export type TDynamicObject = Record<PropertyKey, unknown>;

export type TEventHandler<TEvent extends Event = Event> = {
  bivarianceHack(event: TEvent): TAwaitable<void>;
}['bivarianceHack'];

type TSupportedObjectValues =
  | null
  | undefined
  | string
  | number
  | boolean
  | Date
  | FileList
  | File;

export type TObjectKeyPath<TIndexed> = TIndexed extends Array<infer TArrayItem>
  ? TArrayItem extends TSupportedObjectValues
    ? `${number}`
    : `${number}` | `${number}.${TObjectKeyPath<TArrayItem>}`
  : {
      [PropertyKey in keyof TIndexed &
      string]: TIndexed[PropertyKey] extends TSupportedObjectValues
        ? `${PropertyKey}`
        :
          | `${PropertyKey}`
          | `${PropertyKey}.${TObjectKeyPath<TIndexed[PropertyKey]>}`;
    }[keyof TIndexed & string];

export type TObjectKeyPathValue<TIndexed, PropertyPath> = TIndexed extends unknown
  ? PropertyPath extends `${infer ParentPropertyKey}.${infer ChildrenPropertyKey}`
    ? ParentPropertyKey extends keyof TIndexed
      ? TObjectKeyPathValue<TIndexed[ParentPropertyKey], ChildrenPropertyKey>
      : ParentPropertyKey extends `${number}`
        ? TIndexed extends Array<infer TArrayItem>
          ? TObjectKeyPathValue<TArrayItem, ChildrenPropertyKey>
          : never
        : never
    : PropertyPath extends keyof TIndexed
      ? TIndexed[PropertyPath]
      : PropertyPath extends `${number}`
        ? TIndexed extends Array<infer TArrayItem>
          ? TArrayItem
          : never
        : never
  : never;
