export class WSClientError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = this.constructor.name;
  }
}
