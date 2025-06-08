export function dater(this: unknown, text: string | number | Date) {
  // TODO: Лучше проверять кейсы с Invalid Date
  return new Date(text).toLocaleString('ru', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
