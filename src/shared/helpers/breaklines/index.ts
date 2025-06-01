import Handlebars from 'handlebars';

export function breaklines(this: unknown, text: string) {
  text = Handlebars.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
}
