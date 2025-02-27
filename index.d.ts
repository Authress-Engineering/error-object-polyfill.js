export default class ApplicationError extends Error {
  code: string;
  stack: string;
  message: unknown;
  constructor(message: unknown, code?: string);
}
