import { AddProductStoreParams } from 'src/domain/usecases/product/add-product';
import { ProductStore } from 'src/infra/entities/product-store.entity';
import { Store } from 'src/infra/entities/store.entity';
import { Product } from 'src/infra/entities/product.entity';
import { ProductStore as ProductStoreModel } from 'src/domain/models/product-store';

export interface ProductStoreRepository {
  insert(
    productStore: AddProductStoreParams,
    store: Store,
    product: Product,
  ): Promise<ProductStore>;
  delete(id: number): Promise<void>;
  update(productStore: ProductStoreModel);
}
