import './index.scss';

import { App } from './modules/app';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    throw new Error(`Произошла неудачная попытка смонтировать приложение в элемент с селектором "#root"`);
  }

  const app = new App(rootElement);

  app.render();
});
