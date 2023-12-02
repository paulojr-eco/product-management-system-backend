import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbProductRepository } from './product.repository';
import { Product } from '../../../infra/entities/product.entity';
import { TypeOrmConfigModule } from '../../../main/config/typeorm-config/typeorm-config.module';
import { appDataSource } from '../../../data/helpers/database-helper';
import {
  mockAddProductParams,
  mockUpdateProductData,
} from '../../../data/mocks/product.mocks';

describe('DbProductRepository', () => {
  let repository: DbProductRepository;
  let module: TestingModule;

  beforeAll(async () => {
    await appDataSource.initialize();
    await appDataSource.synchronize(true);
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
    const { description, cost, image } = mockAddProductParams();
    const insertSpy = jest.spyOn(repository, 'insert');
    const product = await repository.insert(mockAddProductParams());
    expect(insertSpy).toHaveBeenLastCalledWith(mockAddProductParams());
    expect(product.id).toEqual(1);
    expect(product.description).toEqual(description);
    expect(product.cost).toBe(cost);
    expect(product.image).toEqual(image);
  });

  it('should find all products with correct values', async () => {
    const { description, cost, image } = mockAddProductParams();
    await repository.insert(mockAddProductParams());
    const products = await repository.findAll();
    expect(products[0].id).toEqual(1);
    expect(products[0].description).toEqual(description);
    expect(products[0].cost).toBe(cost);
    expect(products[0].image).toEqual(image);
  });

  it('should call findById with correct values and return right product', async () => {
    const { description, cost, image } = mockAddProductParams();
    const findByIdSpy = jest.spyOn(repository, 'findById');
    const insertedProduct = await repository.insert(mockAddProductParams());
    const product = await repository.findById(insertedProduct.id);
    expect(findByIdSpy).toHaveBeenCalledWith(insertedProduct.id);
    expect(product.id).toEqual(1);
    expect(product.description).toEqual(description);
    expect(product.cost).toBe(cost);
    expect(product.image).toEqual(image);
  });

  it('should call update with correct values and return right product', async () => {
    const updateSpy = jest.spyOn(repository, 'update');
    const insertedProduct = await repository.insert(mockAddProductParams());
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
    const deleteByIdSpy = jest.spyOn(repository, 'deleteById');
    const insertedProduct = await repository.insert(mockAddProductParams());
    await repository.deleteById(insertedProduct.id);
    const products = await appDataSource.getRepository(Product).find();
    expect(deleteByIdSpy).toHaveBeenCalledWith(insertedProduct.id);
    expect(products.length).toBe(0);
  });
});
