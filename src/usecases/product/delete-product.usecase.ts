import { IDeleteProduct } from 'src/domain/usecases/product/delete-product';
import { ProductRepository } from '../../main/repositories/product-repository.interface';

export class DeleteProductUseCase implements IDeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async delete(id: number): Promise<void> {
    return await this.productRepository.delete(id);
  }
}
