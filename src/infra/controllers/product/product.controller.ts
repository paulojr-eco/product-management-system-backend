import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ProductPresenter } from './product.presenter';
import { ApiResponseType } from '../../../infra/common/swagger/response.decorator';
import { LoadProductsUseCase } from '../../../usecases/product/load-products.usecase';
import { AddProductDto } from './product.dto';
import { AddProductsUseCase } from 'src/usecases/product/add-products.usecase';

@Controller()
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductsUsecaseProxy: UseCaseProxy<LoadProductsUseCase>,
    @Inject(UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductsUseCase>,
  ) {}

  @Get('products')
  @ApiResponseType(ProductPresenter)
  async getProducts() {
    const products = await this.getAllProductsUsecaseProxy.getInstance().load();
    return products.map((product) => new ProductPresenter(product));
  }
  @Post('product')
  async addProduct(@Body() addProductDto: AddProductDto) {
    const { productParams, productStoreParams } = addProductDto;
    await this.addProductUsecaseProxy
      .getInstance()
      .add(productParams, productStoreParams);
  }
}
