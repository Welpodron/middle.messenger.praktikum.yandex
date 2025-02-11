import Handlebars from "handlebars";

import { PAGE_TITLE, PAGE_DESCRIPTION } from "./constants";

import template from "./SomethingWrong.hbs";

export const SomethingWrong = () =>
  Handlebars.compile(template)({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
