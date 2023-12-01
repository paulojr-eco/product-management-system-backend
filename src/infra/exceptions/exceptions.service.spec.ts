import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsService } from './exceptions.service';
import { IFormatExceptionMessage } from 'src/main/exceptions/exceptions.interface';

const mockErrorData = (codeError: number): IFormatExceptionMessage => ({
  message: 'any message',
  code_error: codeError,
});

describe('ExceptionsService', () => {
  let service: ExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionsService],
    }).compile();

    service = module.get<ExceptionsService>(ExceptionsService);
  });

  it('should throw a badRequestException with correct values', () => {
    const errorData = mockErrorData(400);
    expect(() => service.badRequestException(errorData)).toThrow();
    try {
      service.badRequestException(errorData);
    } catch (error) {
      expect(error.getResponse()).toEqual(errorData);
    }
  });

  it('should throw a internalServerErrorException with correct values', () => {
    const errorData = mockErrorData(500);
    expect(() => service.internalServerErrorException(errorData)).toThrow();
    try {
      service.internalServerErrorException(errorData);
    } catch (error) {
      expect(error.getResponse()).toEqual(errorData);
    }
  });

  it('should throw a forbiddenException with correct values', () => {
    const errorData = mockErrorData(403);
    expect(() => service.forbiddenException(errorData)).toThrow();
    try {
      service.forbiddenException(errorData);
    } catch (error) {
      expect(error.getResponse()).toEqual(errorData);
    }
  });

  it('should throw a unAuthorizedException with correct values', () => {
    const errorData = mockErrorData(401);
    expect(() => service.unAuthorizedException(errorData)).toThrow();
    try {
      service.unAuthorizedException(errorData);
    } catch (error) {
      expect(error.getResponse()).toEqual(errorData);
    }
  });
});
