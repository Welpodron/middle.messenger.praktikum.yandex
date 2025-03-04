import type { TChat, TUser } from '../types/api';

export const USERS_MOCK: TUser[] = [
  {
    id: '1',
    login: 'ivanov',
    email: 'ivanov@email.com',
    phone: '+79999999999',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: '777IVAN777',
    picture: 'https://rickandmortyapi.com/api/character/avatar/453.jpeg',
  },
  {
    id: '2',
    login: 'petrov',
    email: 'petrov@email.com',
    phone: '+79999999999',
    first_name: 'Петр',
    second_name: 'Петров',
    display_name: 'PETYA_KILLER',
    picture: 'https://rickandmortyapi.com/api/character/avatar/351.jpeg',
  },
  {
    id: '3',
    login: 'sidorov',
    email: '',
    phone: '+79999999999',
    first_name: 'Сидор',
    second_name: 'Сидоров',
    display_name: 'SIDOR',
    picture: 'https://rickandmortyapi.com/api/character/avatar/383.jpeg',
  },
];

export const CHATS_MOCK: TChat[] = [
  {
    id: '1',
    title: USERS_MOCK[1].display_name ?? USERS_MOCK[1].login,
    picture: USERS_MOCK[1].picture,
    unread_counter: 10,
    last_message: {
      id: '1',
      time: '10:00',
      content: `
        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        `,
      author: USERS_MOCK[1],
    },
    messages: [
      {
        id: '1',
        time: '10:00',
        content: `
        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        `,
        author: USERS_MOCK[1],
      },
      {
        id: '2',
        time: '12:00',
        content: 'Круто!',
        author: USERS_MOCK[0],
      },
    ],
  },
  {
    id: '2',
    title: USERS_MOCK[2].display_name ?? USERS_MOCK[2].login,
    picture: USERS_MOCK[2].picture,
    last_message: {
      id: '2',
      time: '11:00',
      content: 'Hello, world! Hello, world! Hello, world!',
      author: USERS_MOCK[2],
    },
    messages: [
      {
        id: '2',
        time: '11:00',
        content: 'Hello, world! Hello, world! Hello, world!',
        author: USERS_MOCK[2],
      },
    ],
  },
];
