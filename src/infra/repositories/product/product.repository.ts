import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../infra/entities/product.entity';
import { Product as ProductModel } from '../../../domain/models/product';
import { ProductRepository } from '../../../main/repositories/product-repository.interface';
import { AddProductParams } from 'src/domain/usecases/product/add-product';
import { toProductEntity } from './product-repository.transformer';

@Injectable()
export class DbProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async insert(product: AddProductParams): Promise<Product> {
    const productEntity = toProductEntity(product);
    return await this.productRepository.save(productEntity);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.produtoLojas', 'produtoLoja')
      .getMany();
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.findOneOrFail({
      where: { id: id },
    });
    await this.productRepository.delete(id);
  }

  async loadById(id: number): Promise<Product> {
    await this.productRepository.findOneOrFail({
      where: { id: id },
    });
    return await this.productRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.produtoLojas', 'produtoLoja')
      .where('produto.id = :id', { id })
      .getOne();
  }

  async update(product: ProductModel): Promise<void> {
    await this.productRepository.findOneOrFail({
      where: { id: product.id },
    });
    await this.productRepository.update(product.id, product);
  }
}
