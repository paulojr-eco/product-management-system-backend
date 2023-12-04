import { Product } from 'src/infra/entities/product.entity';
import { Product as ProductModel } from 'src/domain/models/product';
import { AddProductParams } from 'src/domain/usecases/product/add-product';

export interface ProductRepository {
  insert(product: AddProductParams): Promise<Product>;
  findAll(): Promise<Product[]>;
  delete(id: number): Promise<void>;
  loadById(id: number): Promise<Product>;
  update(product: ProductModel): Promise<void>;
}
