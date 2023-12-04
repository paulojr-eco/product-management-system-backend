import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { ILoadProductById } from '../../domain/usecases/product/load-product-by-id';
import { Product } from '../../infra/entities/product.entity';

export class LoadProductByIdUseCase implements ILoadProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async loadById(id: number): Promise<Product> {
    return await this.productRepository.loadById(id);
  }
}
