import Handlebars from "handlebars";

import { PAGE_TITLE } from "./constants";

import template from "./SignUp.hbs";

export const SignUp = () =>
  Handlebars.compile(template)({ title: PAGE_TITLE });
