// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCallback = (...args: any[]) => void;

export type TDynamicObject = Record<PropertyKey, unknown>;

export type TAwaitable<T> = T | Promise<T>;

export type TEventHandler<TEvent extends Event = Event> = {
  bivarianceHack(event: TEvent): TAwaitable<void>;
}['bivarianceHack'];
