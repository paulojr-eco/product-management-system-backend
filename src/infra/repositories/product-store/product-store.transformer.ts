import { AddProductStoreParams } from '../../../domain/usecases/product/add-product';
import { ProductStore } from '../../../infra/entities/product-store.entity';
import { Product } from '../../../infra/entities/product.entity';
import { Store } from '../../../infra/entities/store.entity';

export function toProductStoreEntity(
  productStore: AddProductStoreParams,
  store: Store,
  product: Product,
): ProductStore {
  const productStoreEntity: ProductStore = new ProductStore();
  productStoreEntity.produto = product;
  productStoreEntity.loja = store;
  productStoreEntity.precoVenda = productStore.precoVenda;
  return productStoreEntity;
}
