import { AddProductParams } from 'src/domain/usecases/product/add-product';
import { Product as ProductModel } from '../../../domain/models/product';
import { Product as ProductEntity } from '../../../infra/entities/product.entity';

export function toProductEntity(product: AddProductParams): ProductEntity {
  const productEntity: ProductEntity = new ProductEntity();
  productEntity.descricao = product.description;
  productEntity.custo = product.cost;
  productEntity.imagem = product.image;
  return productEntity;
}

export function toProductModel(productEntity: ProductEntity): ProductModel {
  const product: ProductModel = {
    id: productEntity.id,
    description: productEntity.descricao,
    cost: productEntity.custo,
    image: productEntity.imagem,
  };
  return product;
}
