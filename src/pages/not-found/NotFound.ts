import Handlebars from "handlebars";

import { PAGE_TITLE, PAGE_DESCRIPTION } from "./constants";

import template from "./NotFound.hbs";

export const NotFound = () =>
  Handlebars.compile(template)({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
