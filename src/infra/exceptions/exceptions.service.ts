import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IExceptions,
  IFormatExceptionMessage,
} from 'src/main/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IExceptions {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  unAuthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
