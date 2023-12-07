import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filters/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
