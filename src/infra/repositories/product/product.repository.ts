import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new HttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.productRepository.delete(id);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new HttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.productRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.produtoLojas', 'produtoLoja')
      .where('produto.id = :id', { id })
      .getOne();
  }

  async update(product: ProductModel): Promise<void> {
    const findedProduct = await this.productRepository.findOne({
      where: { id: product.id },
    });
    if (!findedProduct) {
      throw new HttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.productRepository.update(product.id, product);
  }
}
