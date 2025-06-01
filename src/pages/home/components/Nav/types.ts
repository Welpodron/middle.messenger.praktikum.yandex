import type { Link } from '@components/Link';
import type { TNavLink } from '../../types';

export type TNavChildren = {
  Links: Link<string>[];
};

export type TNavProps = {
  links: TNavLink[];
};
