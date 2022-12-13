import { ExceptionBase } from '@libs/exceptions';

export class LocationNotEnoughBalanceError extends ExceptionBase {
  static readonly message = 'Location has not enough balance';

  public readonly code = 'LOCATION.NOT_ENOUGH_BALANCE';

  constructor(metadata?: unknown) {
    super(LocationNotEnoughBalanceError.message, undefined, metadata);
  }
}
