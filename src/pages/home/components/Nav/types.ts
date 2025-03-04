import type { TNavLink } from '../../types';

import type { Link } from '../../../../shared/components/Link';

export type TNavChildren = {
  Links: Link[];
};

export type TNavProps = {
  links: TNavLink[];
};
