import { ProductStore } from 'src/domain/models/product-store';

export interface IUpdateProductStore {
  update: (product: ProductStore) => Promise<void>;
}
