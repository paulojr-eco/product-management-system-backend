import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoadProductsUseCase } from '../../../usecases/product/load-products.usecase';
import { AddProductDto } from './product.dto';
import { AddProductsUseCase } from 'src/usecases/product/add-products.usecase';

@Controller()
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductsUsecaseProxy: UseCaseProxy<LoadProductsUseCase>,
    @Inject(UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductsUseCase>,
  ) {}

  @Get('products')
  async getProducts() {
    return await this.getAllProductsUsecaseProxy.getInstance().load();
  }
  @Post('product')
  async addProduct(@Body() addProductDto: AddProductDto) {
    const { productParams, productStoreParams } = addProductDto;
    await this.addProductUsecaseProxy
      .getInstance()
      .add(productParams, productStoreParams);
  }
}
