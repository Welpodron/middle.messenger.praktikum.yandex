const crc32table = new Uint32Array(256).map((_, k) => {
  let c = k;
  for (let i = 0; i < 8; i++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c;
});

// Функция добавлена, так как бэк не отправляет по факту никаких полей, которые являются уникальными для сообщения,
// тк id сообщений, является плавающим указателем
export const crc32 = (string: string) => {
  let crc = 0 ^ -1;

  for (let i = 0; i < string.length; i++) {
    crc = (crc >>> 8) ^ crc32table[(crc ^ string.charCodeAt(i)) & 0xff];
  }

  return (crc ^ -1) >>> 0;
};
