export const COMMON_VALIDATIONS = {
  NOT_EMPTY: {
    test: (value: string) => /^.+$/m.test(value.trim()),
    message: 'Поле не может быть пустым',
  },
  login: {
    test: (value: string) => /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/.test(value),
    message:
      'Поле состоит от 3 до 20 символов, латиницы, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },
  password: {
    test: (value: string) => /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value),
    message:
      'Поле состоит от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  names: {
    test: (value: string) => /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value),
    message: 'Поле состоит из латиницы или кириллицы, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  email: {
    test: (value: string) => /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value),
    message: 'Поле состоит из латиницы, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  },
  phone: {
    test: (value: string) => /^\+?[0-9]{10,15}$/.test(value),
    message: 'Поле состоит от 10 до 15 символов, из цифр, может начинается с плюса',
  },
};
