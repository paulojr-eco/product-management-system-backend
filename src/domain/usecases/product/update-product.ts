import { Product } from '../../models/product';

export interface IUpdateProduct {
  update: (product: Product) => Promise<void>;
}
