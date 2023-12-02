import { EnvironmentConfigService } from '../../main/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();
const config = new EnvironmentConfigService(configService);

export const appDataSource = new DataSource({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [__dirname + './../../infra/**/*.entity.{js,ts}'],
  synchronize: true,
});
