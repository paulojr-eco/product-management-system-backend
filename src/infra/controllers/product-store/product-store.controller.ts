import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { AddProductStoreDto } from './product-store.dto';
import { AddProductStoreUseCase } from '../../../usecases/product-store/add-product-store.usecase';
import { DeleteProductStoreUseCase } from '../../../usecases/product-store/delete-product-store.usecase';

@Controller('product-store')
export class ProductStoreController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_PRODUCT_STORE_USECASES_PROXY)
    private readonly addProductStoreUsecaseProxy: UseCaseProxy<AddProductStoreUseCase>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_STORE_USECASES_PROXY)
    private readonly deleteProductStoreUsecaseProxy: UseCaseProxy<DeleteProductStoreUseCase>,
  ) {}

  @Post()
  async addProductStore(@Body() addProductStoreDto: AddProductStoreDto) {
    const { productStoreParams } = addProductStoreDto;
    return await this.addProductStoreUsecaseProxy
      .getInstance()
      .add(productStoreParams);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.deleteProductStoreUsecaseProxy.getInstance().delete(id);
  }
}
