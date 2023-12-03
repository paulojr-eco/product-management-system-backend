import { AddProductParams } from 'src/domain/usecases/product/add-product';
import { Product as ProductModel } from '../../../domain/models/product';
import { Product as ProductEntity } from '../../../infra/entities/product.entity';

export function toProductEntity(product: AddProductParams): ProductEntity {
  const productEntity: ProductEntity = new ProductEntity();
  productEntity.descricao = product.descricao;
  productEntity.custo = product.custo;
  productEntity.imagem = product.imagem;
  return productEntity;
}

export function toProductModel(productEntity: ProductEntity): ProductModel {
  const product: ProductModel = {
    id: productEntity.id,
    descricao: productEntity.descricao,
    custo: productEntity.custo,
    imagem: productEntity.imagem,
  };
  return product;
}
