import { ILoadStores } from 'src/domain/usecases/store/load-stores';
import { Store } from 'src/infra/entities/store.entity';
import { StoreRepository } from 'src/main/repositories/store.repository.interface';

export class LoadStoresUseCase implements ILoadStores {
  constructor(private readonly storeRepository: StoreRepository) {}

  async load(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }
}
