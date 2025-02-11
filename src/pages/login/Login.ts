import Handlebars from "handlebars";

import { PAGE_TITLE } from "./constants";

import template from "./Login.hbs";

export const Login = () => Handlebars.compile(template)({ title: PAGE_TITLE });
