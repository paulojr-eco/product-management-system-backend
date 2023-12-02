import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ProductPresenter } from './product.presenter';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';
import { LoadProductsUseCase } from '../../../usecases/product/load-products.usecase';

@Controller()
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<LoadProductsUseCase>,
  ) {}

  @Get('products')
  @ApiResponseType(ProductPresenter, true)
  async getTodos() {
    const products = await this.getAllTodoUsecaseProxy.getInstance().load();
    return products.map((product) => new ProductPresenter(product));
  }
}
