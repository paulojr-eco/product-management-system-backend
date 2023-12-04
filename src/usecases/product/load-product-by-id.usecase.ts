import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { IFindProductById } from '../../domain/usecases/product/load-product-by-id';
import { Product } from '../../infra/entities/product.entity';

export class LoadProductByIdUseCase implements IFindProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
