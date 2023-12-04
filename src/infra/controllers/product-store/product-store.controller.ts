import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { AddProductStoreDto } from './product-store.dto';
import { AddProductStoreUseCase } from 'src/usecases/product-store/add-product-store.usecase';

@Controller('product-store')
export class ProductStoreController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_PRODUCT_STORE_USECASES_PROXY)
    private readonly addProductStoreUsecaseProxy: UseCaseProxy<AddProductStoreUseCase>,
  ) {}

  @Post()
  async addProductStore(@Body() addProductStoreDto: AddProductStoreDto) {
    const { productStoreParams } = addProductStoreDto;
    return await this.addProductStoreUsecaseProxy
      .getInstance()
      .add(productStoreParams);
  }
}
