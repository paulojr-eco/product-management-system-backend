import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { IUpdateProduct } from '../../domain/usecases/product/update-product';
import { Product } from '../../domain/models/product';

export class UpdateProductUseCase implements IUpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async update(product: Product): Promise<void> {
    await this.productRepository.update(product);
  }
}
