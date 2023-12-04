import { ProductStoreRepository } from 'src/main/repositories/product-store-repository.interface';
import { ProductRepository } from '../../main/repositories/product-repository.interface';
import { StoreRepository } from 'src/main/repositories/store.repository.interface';
import {
  AddProductParams,
  AddProductStoreParams,
  IAddProduct,
} from 'src/domain/usecases/product/add-product';
import { HttpException } from '@nestjs/common';

export class AddProductsUseCase implements IAddProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productStoreRepository: ProductStoreRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async add(
    product: AddProductParams,
    productsStore: AddProductStoreParams[],
  ): Promise<void> {
    if (this.hasRepeatedStore(productsStore))
      throw new HttpException(
        'Não pode haver mais de um cadastro para a mesma loja',
        400,
      );
    productsStore.forEach(async (productStore) => {
      await this.storeRepository.findById(productStore.idLoja);
    });
    const insertedProduct = await this.productRepository.insert(product);
    productsStore.forEach(async (productStore) => {
      const store = await this.storeRepository.findById(productStore.idLoja);
      this.productStoreRepository.insert(productStore, store, insertedProduct);
    });
  }

  hasRepeatedStore(productsStore: AddProductStoreParams[]) {
    const stores = productsStore.map((productStore) => productStore.idLoja);
    const repeatedStores = stores.filter(
      (store, index) => stores.indexOf(store) !== index,
    );
    return repeatedStores.length > 0;
  }
}
