import { Product } from '../../../infra/entities/product.entity';

export interface IFindProductById {
  findById: (id: number) => Promise<Product>;
}
