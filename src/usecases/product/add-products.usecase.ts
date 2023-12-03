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
    productStore?: AddProductStoreParams,
  ): Promise<void> {
    const store = await this.storeRepository.findById(productStore.idStore);
    const insertedProduct = await this.productRepository.insert(product);
    this.productStoreRepository.insert(productStore, store, insertedProduct);
  }
}
