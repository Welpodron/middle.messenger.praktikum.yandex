import './index.scss';

import { App } from './modules/app';

const ROOT_ELEMENT_ID = 'root';

document.addEventListener('DOMContentLoaded', async () => {
  const rootElement = document.querySelector(`#${ROOT_ELEMENT_ID}`);

  if (!rootElement) {
    throw new Error(`Произошла неудачная попытка смонтировать приложение в элемент с селектором "#${ROOT_ELEMENT_ID}"`);
  }

  const app = new App(rootElement);

  await app.initialize();
});
