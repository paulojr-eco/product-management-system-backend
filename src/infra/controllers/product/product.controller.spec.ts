import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { mockAddOrUpdateProductParams } from '../../../mocks/product.mock';
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

  afterAll(async () => {
    await appDataSource.destroy();
  });

  test('should throw if getAllProductsUsecaseProxy throws', async () => {
    jest.spyOn(controller, 'getProducts').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = controller.getProducts();
    await expect(promise).rejects.toThrow();
  });

  test('should load products with correct value', async () => {
    const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
    const product = await repository.insert({ descricao, custo, imagem });
    const products = await controller.getProducts();
    expect(products).toContainEqual({
      id: product.id,
      ...{ descricao, custo, imagem, produtoLojas: [] },
    });
  });
});
