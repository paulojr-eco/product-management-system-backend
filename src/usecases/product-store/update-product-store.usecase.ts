import { ProductStoreRepository } from 'src/main/repositories/product-store-repository.interface';
import { IUpdateProductStore } from 'src/domain/usecases/product-store/update-product-store';
import { ProductStore } from 'src/domain/models/product-store';

export class UpdateProductStoreUseCase implements IUpdateProductStore {
  constructor(
    private readonly productStoreRepository: ProductStoreRepository,
  ) {}

  async update(productStore: ProductStore): Promise<void> {
    return await this.productStoreRepository.update(productStore);
  }
}
