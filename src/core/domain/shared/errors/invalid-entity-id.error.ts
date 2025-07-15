export class InvalidEntityIdError extends Error {
  constructor(message?: string) {
    super(message || 'Invalid id. It must be a valid ObjectId');

    this.name = 'InvalidEntityIdError';
  }
}
