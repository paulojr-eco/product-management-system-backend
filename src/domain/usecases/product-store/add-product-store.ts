import { ProductStore } from '../../../domain/models/product-store';

export type AddProductStoreInProductCreatedParams = Omit<ProductStore, 'id'>;

export interface IAddProductStore {
  add: (
    productStore: AddProductStoreInProductCreatedParams,
  ) => Promise<ProductStore>;
}
