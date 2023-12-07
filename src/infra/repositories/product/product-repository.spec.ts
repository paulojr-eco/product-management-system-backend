import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbProductRepository } from './product.repository';
import { Product } from '../../../infra/entities/product.entity';
import { TypeOrmConfigModule } from '../../../main/config/typeorm-config/typeorm-config.module';
import {
  appDataSource,
  clearDatabase,
} from '../../../data/helpers/database-helper';
import { mockAddOrUpdateProductParams } from '../../../mocks/product.mock';
import { HttpStatus } from '@nestjs/common';
import { mockHttpException } from '../../../mocks/http-exception.mock';

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
    await clearDatabase();
  });

  afterAll(async () => {
    await module.close();
    await appDataSource.destroy();
  });

  describe('insert()', () => {
    test('should add a new product', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const insertSpy = jest.spyOn(repository, 'insert');
      const product = await repository.insert({ descricao, custo, imagem });
      expect(insertSpy).toHaveBeenLastCalledWith({ descricao, custo, imagem });
      expect(product.id).toBeTruthy();
      expect(product.descricao).toEqual(descricao);
      expect(product.custo).toBe(custo);
      expect(product.imagem).toEqual(imagem);
    });
  });

  describe('findAll()', () => {
    test('should return an empty list if there are no products', async () => {
      const products = await repository.findAll();
      expect(products).toEqual([]);
    });

    test('should contain the product inserted in the products list', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const product = await repository.insert({ descricao, custo, imagem });
      const products = await repository.findAll();
      expect(products).toContainEqual({
        id: product.id,
        ...{ descricao, custo, imagem, produtoLojas: [] },
      });
    });
  });

  describe('delete()', () => {
    test('should throw if the product does not exist', async () => {
      const id = 99999;
      const httpException = mockHttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
      await expect(repository.delete(id)).rejects.toThrow(httpException);
    });

    test('should remove the product', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const product = await repository.insert({ descricao, custo, imagem });
      const deleteSpy = jest.spyOn(repository, 'delete');
      await repository.delete(product.id);
      const products = await repository.findAll();
      expect(deleteSpy).toHaveBeenCalledWith(product.id);
      expect(products).not.toContainEqual({
        id: product.id,
        ...{ descricao, custo, imagem, produtoLojas: [] },
      });
    });
  });

  describe('findById()', () => {
    test('should throw if the product does not exist', async () => {
      const id = 99999;
      const httpException = mockHttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
      await expect(repository.findById(id)).rejects.toThrow(httpException);
    });

    test('should find the correct product', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const product = await repository.insert({ descricao, custo, imagem });
      const findByIdSpy = jest.spyOn(repository, 'findById');
      const productFound = await repository.findById(product.id);
      expect(findByIdSpy).toHaveBeenCalledWith(product.id);
      expect(productFound).toEqual({
        id: product.id,
        ...{ descricao, custo, imagem, produtoLojas: [] },
      });
    });
  });

  describe('update()', () => {
    test('should throw if the product does not exist', async () => {
      const newProductInfo = {
        id: 99999,
        ...mockAddOrUpdateProductParams(),
      };
      const httpException = mockHttpException(
        'O id do produto informado não existe',
        HttpStatus.BAD_REQUEST,
      );
      await expect(repository.update(newProductInfo)).rejects.toThrow(
        httpException,
      );
    });

    test('should update the product', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const product = await repository.insert({ descricao, custo, imagem });
      const newProductInfo = {
        id: product.id,
        ...mockAddOrUpdateProductParams(),
      };
      const updateSpy = jest.spyOn(repository, 'update');
      await repository.update(newProductInfo);
      const productUpdated = await repository.findById(product.id);
      expect(updateSpy).toHaveBeenCalledWith(newProductInfo);
      expect(productUpdated).toEqual({
        ...newProductInfo,
        produtoLojas: [],
      });
    });
  });
});
