import { HttpException, HttpStatus } from '@nestjs/common';

export const mockHttpException = (
  message: string,
  status: HttpStatus,
): HttpException => {
  return new HttpException(message, status);
};
