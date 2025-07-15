export interface ILogger {
  log(context: string, message: string): void;
  error(context: string, error: Error | string): void;
}
