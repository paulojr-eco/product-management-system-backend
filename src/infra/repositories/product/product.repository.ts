import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product as ProductModel } from '../../../domain/models/product';
import { Product as ProductEntity } from '../../../infra/entities/product.entity';
import { ProductRepository } from '../../../main/repositories/product-repository.interface';

@Injectable()
export class DbProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntityRepository: Repository<ProductEntity>,
  ) {}

  private toProductEntity(product: Omit<ProductModel, 'id'>): ProductEntity {
    const productEntity: ProductEntity = new ProductEntity();
    productEntity.descricao = product.description;
    productEntity.custo = product.cost;
    productEntity.imagem = product.image;
    return productEntity;
  }

  private toProductModel(productEntity: ProductEntity): ProductModel {
    const product: ProductModel = {
      id: productEntity.id,
      description: productEntity.descricao,
      cost: productEntity.custo,
      image: productEntity.imagem,
    };
    return product;
  }

  async update(product: ProductModel): Promise<ProductModel> {
    return this.toProductModel(
      await this.productEntityRepository.save({
        id: product.id,
        descricao: product.description,
        custo: product.cost,
        imagem: product.image,
      }),
    );
  }
  async insert(product: Omit<ProductModel, 'id'>): Promise<ProductModel> {
    const productEntity = this.toProductEntity(product);
    return this.toProductModel(
      await this.productEntityRepository.save(productEntity),
    );
  }
  async findAll(): Promise<ProductModel[]> {
    const productsEntity = await this.productEntityRepository.find();
    return productsEntity.map((productEntity) =>
      this.toProductModel(productEntity),
    );
  }
  async findById(id: number): Promise<ProductModel> {
    const productEntity = await this.productEntityRepository.findOneOrFail({
      where: { id: id },
    });
    return this.toProductModel(productEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.productEntityRepository.delete({ id: id });
  }
}
