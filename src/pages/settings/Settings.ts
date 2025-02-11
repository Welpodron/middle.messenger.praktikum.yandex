import Handlebars from "handlebars";

import { MOCK_USER } from "../../shared/constants";
import { PAGE_TITLE } from "./constants";

import template from "./Settings.hbs";

export const Settings = () =>
  Handlebars.compile(template)({
    title: PAGE_TITLE,
    user: MOCK_USER,
  });
