import { ProductStoreRepository } from 'src/main/repositories/product-store-repository.interface';
import { IDeleteProductStore } from 'src/domain/usecases/product-store/delete-product-store';

export class DeleteProductStoreUseCase implements IDeleteProductStore {
  constructor(
    private readonly productStoreRepository: ProductStoreRepository,
  ) {}

  async delete(id: number): Promise<void> {
    return await this.productStoreRepository.delete(id);
  }
}
