import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../../main/config/typeorm-config/typeorm-config.module';
import { Product } from '../entities/product.entity';
import { DbProductRepository } from './product/product.repository';
import { DbProductStoreRepository } from './product-store/product-store.repository';
import { DbStoreRepository } from './store/store.repository';
import { Store } from '../entities/store.entity';
import { ProductStore } from '../entities/product-store.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Product, Store, ProductStore]),
  ],
  providers: [DbProductRepository, DbProductStoreRepository, DbStoreRepository],
  exports: [DbProductRepository, DbProductStoreRepository, DbStoreRepository],
})
export class RepositoriesModule {}
