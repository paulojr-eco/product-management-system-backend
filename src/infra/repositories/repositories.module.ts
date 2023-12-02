import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from 'src/main/config/typeorm-config/typeorm-config.module';
import { Product } from '../entities/product.entity';
import { DbProductRepository } from './product/product.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [DbProductRepository],
  exports: [DbProductRepository],
})
export class RepositoriesModule {}
