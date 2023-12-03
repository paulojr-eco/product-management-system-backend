import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbProductRepository } from './product.repository';
import { Product } from '../../../infra/entities/product.entity';
import { TypeOrmConfigModule } from '../../../main/config/typeorm-config/typeorm-config.module';
import { appDataSource } from '../../../data/helpers/database-helper';
import { mockAddProductParams } from '../../../data/mocks/product.mocks';

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
    expect(product.id).toBeDefined();
    expect(product.descricao).toEqual(description);
    expect(product.custo).toBe(cost);
    expect(product.imagem).toEqual(image);
  });

  it('should find all products with correct values', async () => {
    const { description, cost, image } = mockAddProductParams();
    await repository.insert(mockAddProductParams());
    const products = await repository.findAll();
    console.log('products: ', products);
    expect(products[0].id).toBeDefined();
    expect(products[0].descricao).toEqual(description);
    expect(products[0].custo).toBe(cost);
    expect(products[0].imagem).toEqual(image);
  });
});
