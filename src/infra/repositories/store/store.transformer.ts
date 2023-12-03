import { Store as StoreModel } from 'src/domain/models/store';
import { Store as StoreEntity } from 'src/infra/entities/store.entity';

export function toStoreModel(storeEntity: StoreEntity): StoreModel {
  const store: StoreModel = {
    id: storeEntity.id,
    description: storeEntity.descricao,
  };
  return store;
}
