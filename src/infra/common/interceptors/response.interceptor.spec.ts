import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor, ResponseFormat } from './response.interceptor';
import { Observable, of } from 'rxjs';

class MockData {
  prop: string;
}

@Controller()
class TestController {
  @Get('test')
  @UseInterceptors(ResponseInterceptor)
  test(): Observable<MockData> {
    const mockData: MockData = {
      prop: 'data',
    };
    return of(mockData);
  }
}

describe('ResponseInterceptor', () => {
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [ResponseInterceptor],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test('should intercept and format the response', async () => {
    const response = await request(app.getHttpServer()).get('/test');
    const responseBody: ResponseFormat<MockData> = response.body;
    expect(response.status).toBe(200);
    expect(responseBody.path).toBe('/test');
    expect(responseBody.duration).toMatch(/^\d+ms$/);
    expect(responseBody.method).toBe('GET');
    expect(responseBody.data).toEqual({ prop: 'data' });
  });
});
