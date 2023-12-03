import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../database-config/database-config.interface';

@Injectable()
export class EnvironmentConfigService implements IDatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseType(): string {
    return this.configService.get<string>('DATABASE_TYPE');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>(
      process.env.NODE_ENV === 'test' ? 'DATABASE_PORT_TEST' : 'DATABASE_PORT',
    );
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>(
      process.env.NODE_ENV === 'test' ? 'DATABASE_NAME_TEST' : 'DATABASE_NAME',
    );
  }
}
