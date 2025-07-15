import { plainToInstance } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ValidatorFactory } from '../validator';
import { ValidationError } from '../../errors/validation.error';

class Dto {
  @IsNotEmpty()
  name: string;

  constructor(payload: Dto) {
    Object.assign(this, plainToInstance(Dto, payload));
  }
}

describe('Validator tests', () => {
  it('should throw an error when validation fails', () => {
    const dto = new Dto({ name: '' });

    expect(() => ValidatorFactory.create().execute(dto)).toThrow(ValidationError);
  });

  it('should not throw an error', () => {
    const dto = new Dto({ name: 'Peter Parker' });

    expect(() => ValidatorFactory.create().execute(dto)).not.toThrow(ValidationError);
  });
});
