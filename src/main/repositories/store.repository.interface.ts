import { Store } from '../../infra/entities/store.entity';

export interface StoreRepository {
  findById(id: number): Promise<Store>;
}
