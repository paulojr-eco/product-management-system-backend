import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../infra/entities/product.entity';
import { ProductStore } from '../../../infra/entities/product-store.entity';
import { ProductStoreRepository } from '../../../main/repositories/product-store-repository.interface';
import { AddProductStoreParams } from 'src/domain/usecases/product/add-product';
import { Store } from 'src/infra/entities/store.entity';
import { toProductStoreEntity } from './product-store.transformer';

@Injectable()
export class DbProductStoreRepository implements ProductStoreRepository {
  constructor(
    @InjectRepository(ProductStore)
    private readonly productStoreRepository: Repository<ProductStore>,
  ) {}

  async insert(
    productStore: AddProductStoreParams,
    store: Store,
    product: Product,
  ): Promise<ProductStore> {
    const productStoreEntity = toProductStoreEntity(
      productStore,
      store,
      product,
    );
    return await this.productStoreRepository.save(productStoreEntity);
  }
}
