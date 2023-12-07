import { AddProductParams } from 'src/domain/usecases/product/add-product';
import { Product as ProductEntity } from '../../../infra/entities/product.entity';

export function toProductEntity(product: AddProductParams): ProductEntity {
  const productEntity: ProductEntity = new ProductEntity();
  productEntity.descricao = product.descricao;
  productEntity.custo = product.custo;
  productEntity.imagem = product.imagem;
  return productEntity;
}
