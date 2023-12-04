import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoadProductsUseCase } from '../../../usecases/product/load-products.usecase';
import { AddProductDto, UpdateProductDto } from './product.dto';
import { AddProductsUseCase } from '../../../usecases/product/add-products.usecase';
import { DeleteProductUseCase } from '../../../usecases/product/delete-product.usecase';
import { LoadProductByIdUseCase } from 'src/usecases/product/load-product-by-id.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/update-products.usecase';

@Controller()
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductsUsecaseProxy: UseCaseProxy<LoadProductsUseCase>,
    @Inject(UsecasesProxyModule.ADD_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductsUseCase>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUsecaseProxy: UseCaseProxy<DeleteProductUseCase>,
    @Inject(UsecasesProxyModule.LOAD_BY_ID_PRODUCT_USECASES_PROXY)
    private readonly loadProductByIdUsecaseProxy: UseCaseProxy<LoadProductByIdUseCase>,
    @Inject(UsecasesProxyModule.UPDATE_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecaseProxy: UseCaseProxy<UpdateProductUseCase>,
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

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.deleteProductUsecaseProxy.getInstance().delete(id);
  }

  @Get('product/:id')
  async loadProductById(@Param('id') id: number) {
    return await this.loadProductByIdUsecaseProxy.getInstance().loadById(id);
  }

  @Patch('product')
  async updateProduct(@Body() productDto: UpdateProductDto) {
    const { product } = productDto;
    return await this.updateProductUsecaseProxy.getInstance().update(product);
  }
}
