import { Module } from '@nestjs/common';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { LoggerModule } from './infra/logger/logger.module';
import { UsecasesProxyModule } from './infra/usecases-proxy/usecases-proxy.module';
import { EnvironmentConfigModule } from './main/config/environment-config/environment-config.module';
import { ControllersModule } from './infra/controllers/controllers.module';
import { ConsoleModule } from 'nestjs-console';
import { FixturesModule } from './fixtures/fixtures.module';

@Module({
  imports: [
    ExceptionsModule,
    RepositoriesModule,
    LoggerModule,
    UsecasesProxyModule.register(),
    EnvironmentConfigModule,
    ControllersModule,
    ConsoleModule,
    FixturesModule,
  ],
  providers: [],
})
export class AppModule {}
