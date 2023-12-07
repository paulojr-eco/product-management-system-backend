import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

type GenericError = {
  context: string;
  message: string;
  trace?: string;
};

const mockError = (): GenericError => ({
  context: 'any context',
  message: 'any message',
  trace: 'any trace',
});

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  test('should call debug with correct values', () => {
    const { context, message } = mockError();
    const debugSpy = jest.spyOn(service, 'debug');
    service.debug(context, message);
    expect(debugSpy).toHaveBeenCalledWith(context, message);
  });

  test('should call log with correct values', () => {
    const { context, message } = mockError();
    const logSpy = jest.spyOn(service, 'log');
    service.log(context, message);
    expect(logSpy).toHaveBeenCalledWith(context, message);
  });

  test('should call error with correct values', () => {
    const { context, message, trace } = mockError();
    const errorSpy = jest.spyOn(service, 'error');
    service.error(context, message, trace);
    expect(errorSpy).toHaveBeenCalledWith(context, message, trace);
  });
});
