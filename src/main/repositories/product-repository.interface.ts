import { Product } from 'src/infra/entities/product.entity';
import { AddProductParams } from 'src/domain/usecases/product/add-product';

export interface ProductRepository {
  insert(product: AddProductParams): Promise<Product>;
  findAll(): Promise<Product[]>;
}
