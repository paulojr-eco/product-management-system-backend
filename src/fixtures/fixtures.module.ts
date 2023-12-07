import { Module } from '@nestjs/common';
import { FixturesCommand } from './fixtures.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/infra/entities/product.entity';
import { ProductStore } from 'src/infra/entities/product-store.entity';
import { Store } from 'src/infra/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductStore, Store])],
  providers: [FixturesCommand],
})
export class FixturesModule {}
