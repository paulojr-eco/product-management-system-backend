import { Product } from 'src/infra/entities/product.entity';
import { faker } from '@faker-js/faker';

export const mockAddOrUpdateProductParams = (): Omit<
  Product,
  'id' | 'produtoLojas'
> => ({
  descricao: faker.company.name(),
  custo: faker.number.float({ min: 0, max: 9999999999, precision: 0.001 }),
  imagem: Buffer.from(faker.image.avatar(), 'utf-8'),
});
