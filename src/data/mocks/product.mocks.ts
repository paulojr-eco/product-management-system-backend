import { Product } from '../../domain/models/product';

export const mockAddProductParams = (): Omit<Product, 'id'> => ({
  description: 'any description',
  cost: 99.9,
  image: Buffer.from('any buffer', 'utf-8'),
});

export const mockUpdateProductData = (): Omit<Product, 'id'> => ({
  description: 'other description',
  cost: 0.0,
  image: Buffer.from('any buffer', 'utf-8'),
});
