export default class ApplicationError extends Error {
  name: string;
  code: string;
  stack: string;
  message: string | Record<string, unknown>;
  constructor(message: unknown, code?: string);
}
