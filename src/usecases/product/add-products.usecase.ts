import { ProductStoreRepository } from 'src/main/repositories/product-store-repository.interface';
import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { StoreRepository } from 'src/main/repositories/store.repository.interface';
import {
  AddProductParams,
  AddProductStoreParams,
  IAddProduct,
} from 'src/domain/usecases/product/add-product';

export class AddProductsUseCase implements IAddProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productStoreRepository: ProductStoreRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async add(
    product: AddProductParams,
    productsStore?: AddProductStoreParams[],
  ): Promise<void> {
    if (productsStore) {
      productsStore.forEach(async (productStore) => {
        await this.storeRepository.findById(productStore.idLoja);
      });
    }
    const insertedProduct = await this.productRepository.insert(product);
    if (productsStore) {
      productsStore.forEach(async (productStore) => {
        const store = await this.storeRepository.findById(productStore.idLoja);
        this.productStoreRepository.insert(
          productStore,
          store,
          insertedProduct,
        );
      });
    }
  }
}
