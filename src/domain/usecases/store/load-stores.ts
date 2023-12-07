import { Store } from 'src/infra/entities/store.entity';

export interface ILoadStores {
  load: () => Promise<Store[]>;
}
