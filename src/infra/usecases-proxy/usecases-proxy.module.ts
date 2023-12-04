import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DbProductRepository } from '../repositories/product/product.repository';
import { UseCaseProxy } from './usecases-proxy';
import { LoadProductsUseCase } from '../../usecases/product/load-products.usecase';
import { AddProductsUseCase } from '../../usecases/product/add-products.usecase';
import { DbProductStoreRepository } from '../repositories/product-store/product-store.repository';
import { DbStoreRepository } from '../repositories/store/store.repository';
import { DeleteProductUseCase } from 'src/usecases/product/delete-product.usecase';
import { LoadProductByIdUseCase } from 'src/usecases/product/load-product-by-id.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/update-products.usecase';
import { AddProductStoreUseCase } from 'src/usecases/product-store/add-product-store.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUsecasesProxy';
  static ADD_PRODUCT_USECASES_PROXY = 'addProductUsecasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'deleteProductUsecasesProxy';
  static LOAD_BY_ID_PRODUCT_USECASES_PROXY = 'loadProductByIdUsecasesProxy';
  static UPDATE_PRODUCT_USECASES_PROXY = 'updateProductUsecasesProxy';
  static ADD_PRODUCT_STORE_USECASES_PROXY = 'addProductStoreUsecasesProxy';

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
        {
          inject: [DbProductRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (ProductRepository: DbProductRepository) =>
            new UseCaseProxy(new DeleteProductUseCase(ProductRepository)),
        },
        {
          inject: [DbProductRepository],
          provide: UsecasesProxyModule.LOAD_BY_ID_PRODUCT_USECASES_PROXY,
          useFactory: (ProductRepository: DbProductRepository) =>
            new UseCaseProxy(new LoadProductByIdUseCase(ProductRepository)),
        },
        {
          inject: [DbProductRepository],
          provide: UsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY,
          useFactory: (ProductRepository: DbProductRepository) =>
            new UseCaseProxy(new UpdateProductUseCase(ProductRepository)),
        },
        {
          inject: [
            DbProductRepository,
            DbProductStoreRepository,
            DbStoreRepository,
          ],
          provide: UsecasesProxyModule.ADD_PRODUCT_STORE_USECASES_PROXY,
          useFactory: (
            ProductRepository: DbProductRepository,
            ProductStoreRepository: DbProductStoreRepository,
            StoreRepository: DbStoreRepository,
          ) =>
            new UseCaseProxy(
              new AddProductStoreUseCase(
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
        UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.LOAD_BY_ID_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.ADD_PRODUCT_STORE_USECASES_PROXY,
      ],
    };
  }
}
