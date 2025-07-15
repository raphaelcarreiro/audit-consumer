import { Validator } from './validator/validator';

export abstract class Application {
  public async execute(input: any): Promise<void> {
    new Validator().execute(input);

    await this.handle(input);
  }

  protected abstract handle(input: any): Promise<void>;
}
