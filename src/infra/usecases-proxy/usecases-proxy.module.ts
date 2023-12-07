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
import { DeleteProductUseCase } from '../../usecases/product/delete-product.usecase';
import { LoadProductByIdUseCase } from '../../usecases/product/load-product-by-id.usecase';
import { UpdateProductUseCase } from '../../usecases/product/update-products.usecase';
import { AddProductStoreUseCase } from '../../usecases/product-store/add-product-store.usecase';
import { DeleteProductStoreUseCase } from '../../usecases/product-store/delete-product-store.usecase';
import { UpdateProductStoreUseCase } from '../../usecases/product-store/update-product-store.usecase';
import { LoadStoresUseCase } from '../../usecases/store/load-stores.usecase';

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
  static DELETE_PRODUCT_STORE_USECASES_PROXY =
    'deleteProductStoreUsecasesProxy';
  static UPDATE_PRODUCT_STORE_USECASES_PROXY =
    'updateProductStoreUsecasesProxy';
  static GET_STORES_USECASES_PROXY = 'getStoresUsecasesProxy';

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
        {
          inject: [DbProductStoreRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_STORE_USECASES_PROXY,
          useFactory: (ProductStoreRepository: DbProductStoreRepository) =>
            new UseCaseProxy(
              new DeleteProductStoreUseCase(ProductStoreRepository),
            ),
        },
        {
          inject: [DbProductStoreRepository],
          provide: UsecasesProxyModule.UPDATE_PRODUCT_STORE_USECASES_PROXY,
          useFactory: (ProductStoreRepository: DbProductStoreRepository) =>
            new UseCaseProxy(
              new UpdateProductStoreUseCase(ProductStoreRepository),
            ),
        },
        {
          inject: [DbStoreRepository],
          provide: UsecasesProxyModule.GET_STORES_USECASES_PROXY,
          useFactory: (StoreRepository: DbStoreRepository) =>
            new UseCaseProxy(new LoadStoresUseCase(StoreRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.LOAD_BY_ID_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.ADD_PRODUCT_STORE_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_STORE_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_PRODUCT_STORE_USECASES_PROXY,
        UsecasesProxyModule.GET_STORES_USECASES_PROXY,
      ],
    };
  }
}
