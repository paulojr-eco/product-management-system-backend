import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filters/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
