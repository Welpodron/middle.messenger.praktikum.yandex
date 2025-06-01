import type { TNavLink } from './types';

export const PAGE_TITLE = 'Добро пожаловать!';
export const PAGE_DESCRIPTION = 'В очередной мега-крутой мессенджер, который вы еще ни разу не видели!™';

export const NAV_LINKS: TNavLink[] = [
  { url: '/login', text: 'Войти' },
  { url: '/sign-up', text: 'Зарегистрироваться' },
  { url: '/settings', text: 'Профиль' },
  { url: '/messenger', text: 'Чат' },
  { url: '/404', text: '404' },
  { url: '/something-wrong', text: '5**' },
];
