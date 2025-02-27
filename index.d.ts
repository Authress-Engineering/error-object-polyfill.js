export class ApplicationError extends Error {
  code: string;
  stack: string;
  message: object;
  constructor(message: object, code?: string);
}
