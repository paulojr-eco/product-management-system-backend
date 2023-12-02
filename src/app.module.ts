import { Module } from '@nestjs/common';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { LoggerModule } from './infra/logger/logger.module';
import { UsecasesProxyModule } from './infra/usecases-proxy/usecases-proxy.module';
import { EnvironmentConfigModule } from './main/config/environment-config/environment-config.module';
import { ControllersModule } from './infra/controllers/controllers.module';

@Module({
  imports: [
    ExceptionsModule,
    RepositoriesModule,
    LoggerModule,
    UsecasesProxyModule.register(),
    EnvironmentConfigModule,
    ControllersModule,
  ],
  providers: [],
})
export class AppModule {}
