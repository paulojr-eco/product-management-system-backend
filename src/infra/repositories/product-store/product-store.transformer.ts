import { AddProductStoreParams } from 'src/domain/usecases/product/add-product';
import { ProductStore } from 'src/infra/entities/product-store.entity';
import { Product } from 'src/infra/entities/product.entity';
import { Store } from 'src/infra/entities/store.entity';

export function toProductStoreEntity(
  productStore: AddProductStoreParams,
  store: Store,
  product: Product,
): ProductStore {
  const productStoreEntity: ProductStore = new ProductStore();
  productStoreEntity.produto = product;
  productStoreEntity.loja = store;
  productStoreEntity.precoVenda = productStore.saleCost;
  return productStoreEntity;
}
