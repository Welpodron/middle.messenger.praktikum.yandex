import type { Nav } from './components/Nav';

export type THomeChildren = {
  Nav: Nav;
};

export type THomeProps = {
  title: string;
  description: string;
};

export type TNavLink = {
  url: string;
  text: string;
};
