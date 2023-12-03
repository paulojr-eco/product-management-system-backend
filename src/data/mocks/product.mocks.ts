import { Product } from 'src/infra/entities/product.entity';

export const mockAddProductParams = (): Omit<Product, 'id'> => ({
  descricao: 'any description',
  custo: 99.9,
  imagem: Buffer.from('any buffer', 'utf-8'),
  produtoLojas: [],
});

export const mockUpdateProductData = (): Omit<Product, 'id'> => ({
  descricao: 'other description',
  custo: 0.0,
  imagem: Buffer.from('any buffer', 'utf-8'),
  produtoLojas: [],
});
