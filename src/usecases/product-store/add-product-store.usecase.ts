import { ProductStoreRepository } from '../../main/repositories/product-store-repository.interface';
import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { StoreRepository } from '../../main/repositories/store.repository.interface';
import {
  AddProductStoreInProductCreatedParams,
  IAddProductStore,
} from '../../domain/usecases/product-store/add-product-store';

export class AddProductStoreUseCase implements IAddProductStore {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productStoreRepository: ProductStoreRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async add(
    productStore: AddProductStoreInProductCreatedParams,
  ): Promise<void> {
    const store = await this.storeRepository.findById(productStore.idLoja);
    const product = await this.productRepository.findById(
      productStore.idProduto,
    );
    await this.productStoreRepository.insert(productStore, store, product);
  }
}
