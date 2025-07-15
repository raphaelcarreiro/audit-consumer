import isEqual from 'lodash/isEqual';

export abstract class ValueObjectAbsctract<Value> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  public equals(value: this): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (value.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(value, this);
  }

  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return String(this.value);
      } catch (err) {
        return this.value + '';
      }
    }

    const value = String(this.value);

    return value === '[object Object]' ? JSON.stringify(this.value) : value;
  };

  toJSON() {
    return this._value;
  }
}
