import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbProductRepository } from './product.repository';
import { Product } from '../../../infra/entities/product.entity';
import { Product as ProductModel } from '../../../domain/models/product';
import { TypeOrmConfigModule } from '../../../main/config/typeorm-config/typeorm-config.module';
import { appDataSource } from '../../../data/helpers/database-helper';

const mockProduct = (): ProductModel => ({
  id: 1,
  description: 'any description',
  cost: 99.9,
  image: 'any image',
});

const mockUpdateProductData = (): Omit<ProductModel, 'id'> => ({
  description: 'other description',
  cost: 0.0,
  image: 'other image',
});

describe('DbProductRepository', () => {
  let repository: DbProductRepository;
  let module: TestingModule;

  beforeAll(async () => {
    await appDataSource.initialize();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
      providers: [DbProductRepository],
    }).compile();

    repository = module.get<DbProductRepository>(DbProductRepository);
  });

  afterEach(async () => {
    await appDataSource.synchronize(true);
  });

  afterAll(async () => {
    await module.close();
    await appDataSource.destroy();
  });

  it('should call insert with correct values and return right product', async () => {
    const { description, cost, image } = mockProduct();
    const insertSpy = jest.spyOn(repository, 'insert');
    const product = await repository.insert({ description, cost, image });
    expect(insertSpy).toHaveBeenLastCalledWith({ description, cost, image });
    expect(product.id).toEqual(1);
    expect(product.description).toEqual(description);
    expect(product.cost).toBe(cost);
    expect(product.image).toEqual(image);
  });

  it('should find all products with correct values', async () => {
    const { description, cost, image } = mockProduct();
    await repository.insert({ description, cost, image });
    const products = await repository.findAll();
    expect(products[0].id).toEqual(1);
    expect(products[0].description).toEqual(description);
    expect(products[0].cost).toBe(cost);
    expect(products[0].image).toEqual(image);
  });

  it('should call findById with correct values and return right product', async () => {
    const { description, cost, image } = mockProduct();
    const findByIdSpy = jest.spyOn(repository, 'findById');
    const insertedProduct = await repository.insert({
      description,
      cost,
      image,
    });
    const product = await repository.findById(insertedProduct.id);
    expect(findByIdSpy).toHaveBeenCalledWith(insertedProduct.id);
    expect(product.id).toEqual(1);
    expect(product.description).toEqual(description);
    expect(product.cost).toBe(cost);
    expect(product.image).toEqual(image);
  });

  it('should call update with correct values and return right product', async () => {
    const { description, cost, image } = mockProduct();
    const updateSpy = jest.spyOn(repository, 'update');
    const insertedProduct = await repository.insert({
      description,
      cost,
      image,
    });
    const newProductData = mockUpdateProductData();
    const product = await repository.update({
      id: insertedProduct.id,
      ...newProductData,
    });
    expect(updateSpy).toHaveBeenCalledWith({
      id: insertedProduct.id,
      ...newProductData,
    });
    expect(product.id).toEqual(1);
    expect(product.description).toEqual(newProductData.description);
    expect(product.cost).toBe(newProductData.cost);
    expect(product.image).toEqual(newProductData.image);
  });

  it('should call deleteById with correct values and return empty array', async () => {
    const { description, cost, image } = mockProduct();
    const deleteByIdSpy = jest.spyOn(repository, 'deleteById');
    const insertedProduct = await repository.insert({
      description,
      cost,
      image,
    });
    await repository.deleteById(insertedProduct.id);
    const products = await appDataSource.getRepository(Product).find();
    expect(deleteByIdSpy).toHaveBeenCalledWith(insertedProduct.id);
    expect(products.length).toBe(0);
  });
});
