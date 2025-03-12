import type { TNavLink } from '../../types';

import type { Link } from '@components/Link';

export type TNavChildren = {
  Links: Link[];
};

export type TNavProps = {
  links: TNavLink[];
};
