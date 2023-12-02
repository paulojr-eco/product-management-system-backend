import { Product } from '../../domain/models/product';

export const mockAddProductParams = (): Omit<Product, 'id'> => ({
  description: 'any description',
  cost: 99.9,
  image: 'any image',
});

export const mockUpdateProductData = (): Omit<Product, 'id'> => ({
  description: 'other description',
  cost: 0.0,
  image: 'other image',
});
