export class HTTPClientError extends Error {
  code: number;
  data?: unknown;

  constructor({ message, code, data }: { message: string; code: number; data?: unknown }) {
    super(message);

    this.code = code;
    this.data = data;
    this.name = this.constructor.name;
  }
}
