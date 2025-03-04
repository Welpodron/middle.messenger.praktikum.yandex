import Handlebars from "handlebars";

import { PAGE_TITLE, PAGE_DESCRIPTION, NAV_LINKS } from "./constants";

import template from "./Home.hbs";

export const Home = () =>
  Handlebars.compile(template)({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    links: NAV_LINKS,
  });
