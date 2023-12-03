import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DbProductRepository } from '../repositories/product/product.repository';
import { UseCaseProxy } from './usecases-proxy';
import { LoadProductsUseCase } from '../../usecases/product/load-products.usecase';
import { AddProductsUseCase } from 'src/usecases/product/add-products.usecase';
import { DbProductStoreRepository } from '../repositories/product-store/product-store.repository';
import { DbStoreRepository } from '../repositories/store/store.repository';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUsecasesProxy';
  static ADD_PRODUCT_USECASES_PROXY = 'addProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DbProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (ProductRepository: DbProductRepository) =>
            new UseCaseProxy(new LoadProductsUseCase(ProductRepository)),
        },
        {
          inject: [
            DbProductRepository,
            DbProductStoreRepository,
            DbStoreRepository,
          ],
          provide: UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY,
          useFactory: (
            ProductRepository: DbProductRepository,
            ProductStoreRepository: DbProductStoreRepository,
            StoreRepository: DbStoreRepository,
          ) =>
            new UseCaseProxy(
              new AddProductsUseCase(
                ProductRepository,
                ProductStoreRepository,
                StoreRepository,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY,
      ],
    };
  }
}
