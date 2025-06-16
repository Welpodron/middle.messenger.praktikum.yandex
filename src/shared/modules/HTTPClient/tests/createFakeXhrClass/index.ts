import sinon from 'sinon';

export const createFakeXhrClass = () => {
  return class FakeXHR {
    static currentXHR: FakeXHR | null = null;

    status = 200;
    response: unknown;
    method = '';
    url = '';
    withCredentials = false;
    responseType = 'any';

    onload?: () => void;
    onerror?: () => void;
    onabort?: () => void;
    ontimeout?: () => void;

    constructor() {
      FakeXHR.currentXHR = this;
    }

    open = sinon.fake((method: string, url: string) => {
      this.method = method;
      this.url = url;
    });

    send = sinon.fake((data: unknown) => {
      globalThis.setTimeout(() => {
        if (data === JSON.stringify('timeout')) {
          this.ontimeout?.();
        }
        else if (data === JSON.stringify('crash')) {
          this.onerror?.();
        }
        else if (data === JSON.stringify('error')) {
          this.status = 500;

          this.response = { reason: data };

          this.onload?.();
        }
        else {
          this.status = 200;

          this.response = data;

          this?.onload?.();
        }
      });
    });

    abort = sinon.fake(() => {
      this?.onabort?.();
    });

    setRequestHeader = sinon.fake();
  };
};
