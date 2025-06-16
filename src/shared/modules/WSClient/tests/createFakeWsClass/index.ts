import sinon from 'sinon';

class FakeMessageEvent extends Event {
  data: string;

  constructor(data: unknown) {
    super('message');

    this.data = JSON.stringify(data);
  }
}

export const createFakeWsClass = () => {
  return class FakeWs {
    path: string;
    readyState = FakeWs.CONNECTING; // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED

    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    onclose?: (event: Event) => void;
    onerror?: (event: Event) => void;
    onmessage?: (event: FakeMessageEvent) => void;
    onopen?: (event: Event) => void;

    constructor(path: string) {
      this.path = path;

      globalThis.setTimeout(() => {
        this.readyState = FakeWs.OPEN;
        this.onopen?.(new Event('open'));
      });
    }

    close = sinon.fake(() => {
      globalThis.setTimeout(() => {
        this.readyState = FakeWs.CLOSED;
        this.onclose?.(new Event('close'));
      });
    });

    send = sinon.fake((data: unknown) => {
      globalThis.setTimeout(() => {
        this.onmessage?.(new FakeMessageEvent(data));
      });
    });
  };
};
