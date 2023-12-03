import { ILoadProducts } from '../../domain/usecases/product/load-products';
import { Product } from '../../domain/models/product';
import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { toProductModel } from '../../infra/repositories/product/product-repository.transformer';

export class LoadProductsUseCase implements ILoadProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async load(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => toProductModel(product));
  }
}
