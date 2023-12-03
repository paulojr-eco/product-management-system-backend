import { Product } from '../../../infra/entities/product.entity';

export interface ILoadProducts {
  load: () => Promise<Product[]>;
}
