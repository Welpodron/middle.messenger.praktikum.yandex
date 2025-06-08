import type { Link } from '../Link';

export type TErrorSplashChildren = {
  LinkBack: Link<string>;
};

export type TErrorSplashProps = {
  title: string;
  message: string;
};
