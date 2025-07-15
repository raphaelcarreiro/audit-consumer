export class ApplicationEvent<T = any> {
  constructor(
    public readonly name: string,
    public readonly value: T,
  ) {}
}
