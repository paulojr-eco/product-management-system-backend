import { Product } from '../../../infra/entities/product.entity';

export interface ILoadProductById {
  loadById: (id: number) => Promise<Product>;
}
