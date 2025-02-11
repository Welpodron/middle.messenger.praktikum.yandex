import "./index.scss";

import { App } from "./modules/app";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector("#root");

  if (!rootElement) {
    return;
  }

  const app = new App(rootElement);

  app.render();
});
