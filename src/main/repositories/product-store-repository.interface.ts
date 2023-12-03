import { AddProductStoreParams } from 'src/domain/usecases/product/add-product';
import { ProductStore } from 'src/infra/entities/product-store.entity';
import { Store } from 'src/infra/entities/store.entity';
import { Product } from 'src/infra/entities/product.entity';

export interface ProductStoreRepository {
  insert(
    productStore: AddProductStoreParams,
    store: Store,
    product: Product,
  ): Promise<ProductStore>;
}
