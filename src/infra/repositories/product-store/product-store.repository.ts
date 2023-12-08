import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../infra/entities/product.entity';
import { ProductStore } from '../../../infra/entities/product-store.entity';
import { ProductStoreRepository } from '../../../main/repositories/product-store-repository.interface';
import { AddProductStoreParams } from '../../../domain/usecases/product/add-product';
import { Store } from '../../../infra/entities/store.entity';
import { toProductStoreEntity } from './product-store.transformer';
import { ProductStore as ProductStoreModel } from '../../../domain/models/product-store';

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

  async delete(id: number): Promise<void> {
    const productStore = await this.productStoreRepository.findOne({
      where: { id: id },
    });
    if (!productStore) {
      throw new HttpException('Relação de produto e loja não encontrado', 400);
    }
    await this.productStoreRepository.delete({ id });
  }

  async update(productStore: ProductStoreModel) {
    const dbProductStore = await this.productStoreRepository.findOne({
      where: { id: productStore.id },
    });
    if (!dbProductStore) {
      throw new HttpException('Relação de produto e loja não encontrado', 400);
    }
    await this.productStoreRepository.update(productStore.id, productStore);
  }
}
