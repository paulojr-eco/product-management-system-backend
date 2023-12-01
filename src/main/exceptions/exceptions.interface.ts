export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IExceptions {
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  unAuthorizedException(data?: IFormatExceptionMessage): void;
}
