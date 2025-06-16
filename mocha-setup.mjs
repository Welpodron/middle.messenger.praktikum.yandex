import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomFillSync } from 'crypto';
import { JSDOM } from 'jsdom';

chai.use(chaiAsPromised);

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalCrypto = globalThis.crypto;

const jsdom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="root"></div></body></html>',
  {
    url: 'http://localhost:3000',
  },
);

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;

if (!originalCrypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: { getRandomValues: randomFillSync },
  });
}

export const mochaHooks = {
  afterAll() {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
    if (!originalCrypto) {
      Object.defineProperty(globalThis, 'crypto', originalCrypto);
    }
  },
};
