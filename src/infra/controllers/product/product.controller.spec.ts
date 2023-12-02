import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { mockAddProductParams } from '../../../data/mocks/product.mocks';
import { TypeOrmConfigModule } from '../../../main/config/typeorm-config/typeorm-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../../infra/entities/product.entity';
import { DbProductRepository } from '../../../infra/repositories/product/product.repository';
import { appDataSource } from '../../../data/helpers/database-helper';
import { UsecasesProxyModule } from '../../../infra/usecases-proxy/usecases-proxy.module';

describe('ProductController', () => {
  let controller: ProductController;
  let repository: DbProductRepository;

  beforeAll(async () => {
    await appDataSource.initialize();
    await appDataSource.synchronize(true);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([Product]),
        UsecasesProxyModule.register(),
      ],
      controllers: [ProductController],
      providers: [DbProductRepository],
    }).compile();

    repository = module.get<DbProductRepository>(DbProductRepository);
    controller = module.get<ProductController>(ProductController);
  });

  afterEach(async () => {
    await appDataSource.synchronize(true);
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  it('should throw if getAllProductsUsecaseProxy throws', async () => {
    jest.spyOn(controller, 'getProducts').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = controller.getProducts();
    await expect(promise).rejects.toThrow();
  });

  it('should load products with correct value', async () => {
    await repository.insert(mockAddProductParams());
    const products = await controller.getProducts();
    expect(products.length).toBe(1);
    expect(products[0]).toEqual({ id: 1, ...mockAddProductParams() });
  });
});
