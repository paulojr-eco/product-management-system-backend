import { Controller, Get, Inject } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoadStoresUseCase } from 'src/usecases/store/load-stores.usecase';

@Controller('stores')
export class StoresController {
  constructor(
    @Inject(UsecasesProxyModule.GET_STORES_USECASES_PROXY)
    private readonly loadStoresUsecaseProxy: UseCaseProxy<LoadStoresUseCase>,
  ) {}

  @Get()
  async getStores() {
    return await this.loadStoresUsecaseProxy.getInstance().load();
  }
}
