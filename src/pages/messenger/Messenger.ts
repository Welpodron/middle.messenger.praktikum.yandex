import Handlebars from "handlebars";

import { MOCK_USER } from "../../shared/constants";
import { PAGE_TITLE } from "./constants";

import template from "./Messenger.hbs";

export const Messenger = () =>
  Handlebars.compile(template)({ title: PAGE_TITLE, user: MOCK_USER });
