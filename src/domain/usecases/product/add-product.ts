import { ProductStore } from '../../../domain/models/product-store';
import { Product } from '../../../domain/models/product';

export type AddProductParams = Omit<Product, 'id'>;
export type AddProductStoreParams = Omit<ProductStore, 'id' | 'idProduct'>;

export interface IAddProduct {
  add: (
    product: AddProductParams,
    productsStore?: AddProductStoreParams[],
  ) => Promise<void>;
}
