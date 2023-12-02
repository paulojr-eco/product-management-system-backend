import { ILoadProducts } from '../../domain/usecases/product/load-products';
import { Product } from '../../domain/models/product';
import { ProductRepository } from '../../main/repositories/product-repository.interface';

export class LoadProductsUseCase implements ILoadProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async load(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
