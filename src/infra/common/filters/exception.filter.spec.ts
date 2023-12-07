import { Test, TestingModule } from '@nestjs/testing';
import { AllExceptionFilter } from './exception.filter';
import { LoggerService } from '../../logger/logger.service';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

const mockGenericException = () => new Error('any message');
const mockHttpException = () =>
  new HttpException('another message', HttpStatus.BAD_REQUEST);

const mockHost = () =>
  ({
    switchToHttp: () => ({
      getResponse: () => ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
      getRequest: () => ({
        method: 'GET',
        url: '/test',
        path: '/test',
      }),
    }),
  }) as ArgumentsHost;

describe('AllExceptionFilter', () => {
  let filter: AllExceptionFilter;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionFilter, LoggerService],
    }).compile();

    filter = module.get<AllExceptionFilter>(AllExceptionFilter);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should catch and handle generic exception', () => {
    const exception = mockGenericException();
    const host = mockHost();
    const errorSpy = jest.spyOn(loggerService, 'error');
    const request = host.switchToHttp().getRequest();
    filter.catch(exception, host);
    expect(errorSpy).toHaveBeenCalledWith(
      `End Request for ${request.path}`,
      `method=${request.method} status=${HttpStatus.INTERNAL_SERVER_ERROR} message=any message`,
      exception.stack,
    );
  });

  test('should catch and handle http exception', () => {
    const exception = mockHttpException();
    const host = mockHost();
    const warnSpy = jest.spyOn(loggerService, 'warn');
    const request = host.switchToHttp().getRequest();
    filter.catch(exception, host);
    expect(warnSpy).toHaveBeenCalledWith(
      `End Request for ${request.path}`,
      `method=${request.method} status=${HttpStatus.BAD_REQUEST} message=another message`,
    );
  });
});
