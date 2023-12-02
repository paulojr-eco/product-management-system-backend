import { Product } from 'src/domain/models/product';

export interface ProductRepository {
  insert(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  update(product: Product): Promise<Product>;
  deleteById(id: number): Promise<void>;
}
