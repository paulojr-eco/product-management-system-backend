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
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
      providers: [DbProductRepository],
    }).compile();

    repository = module.get<DbProductRepository>(DbProductRepository);
  });

  afterAll(async () => {
    await module.close();
    await appDataSource.destroy();
  });

  it('should call insert with correct values and return right product', async () => {
    const { descricao, custo, imagem } = mockAddProductParams();
    const insertSpy = jest.spyOn(repository, 'insert');
    const product = await repository.insert(mockAddProductParams());
    expect(insertSpy).toHaveBeenLastCalledWith(mockAddProductParams());
    expect(product.id).toBeDefined();
    expect(product.descricao).toEqual(descricao);
    expect(product.custo).toBe(custo);
    expect(product.imagem).toEqual(imagem);
  });

  it('should find all products with correct values', async () => {
    const { descricao, custo, imagem } = mockAddProductParams();
    await repository.insert(mockAddProductParams());
    const products = await repository.findAll();
    expect(products[0].id).toBeDefined();
    expect(products[0].descricao).toEqual(descricao);
    expect(products[0].custo).toBe(custo);
    expect(products[0].imagem).toEqual(imagem);
  });
});
