import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DbProductRepository } from '../repositories/product/product.repository';
import { UseCaseProxy } from './usecases-proxy';
import { LoadProductsUseCase } from '../../usecases/product/load-products.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUsecasesProxy';

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
      ],
      exports: [UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY],
    };
  }
}
