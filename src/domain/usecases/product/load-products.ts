import { Product } from '../../../domain/models/product';

export interface ILoadProducts {
  load: () => Promise<Product[]>;
}
