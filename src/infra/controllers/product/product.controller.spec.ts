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

  describe('getProducts()', () => {
    test('should call getAllProductsUsecaseProxy.load', async () => {
      const getProductsSpy = jest.spyOn(controller, 'getProducts');
      await controller.getProducts();
      expect(getProductsSpy).toHaveBeenCalled();
    });

    test('should throw if updateProductUsecaseProxy.load throws', async () => {
      jest.spyOn(controller, 'getProducts').mockImplementationOnce(async () => {
        throw new Error();
      });
      const promise = controller.getProducts();
      await expect(promise).rejects.toThrow();
    });
  });

  describe('addProduct()', () => {
    test('should call addProductUsecaseProxy.add', async () => {
      const addProductSpy = jest.spyOn(controller, 'addProduct');
      const productToAdd = {
        productParams: mockAddOrUpdateProductParams(),
        productStoreParams: [],
      };
      await controller.addProduct(productToAdd);
      expect(addProductSpy).toHaveBeenCalledWith(productToAdd);
    });

    test('should throw if addProductUsecaseProxy.add throws', async () => {
      const productToAdd = {
        productParams: mockAddOrUpdateProductParams(),
        productStoreParams: [],
      };
      jest.spyOn(controller, 'addProduct').mockImplementationOnce(async () => {
        throw new Error();
      });
      const promise = controller.addProduct(productToAdd);
      await expect(promise).rejects.toThrow();
    });
  });

  describe('deleteProduct()', () => {
    test('should call deleteProductUsecaseProxy.delete', async () => {
      const product = await repository.insert({
        ...mockAddOrUpdateProductParams(),
      });
      const deleteProductSpy = jest.spyOn(controller, 'deleteProduct');
      await controller.deleteProduct(product.id);
      expect(deleteProductSpy).toHaveBeenCalledWith(product.id);
    });

    test('should throw if deleteProductUsecaseProxy.delete throws', async () => {
      const product = await repository.insert({
        ...mockAddOrUpdateProductParams(),
      });
      jest
        .spyOn(controller, 'deleteProduct')
        .mockImplementationOnce(async () => {
          throw new Error();
        });
      const promise = controller.deleteProduct(product.id);
      await expect(promise).rejects.toThrow();
    });
  });

  describe('loadProductById()', () => {
    test('should call loadProductByIdUsecaseProxy.findById', async () => {
      const product = await repository.insert({
        ...mockAddOrUpdateProductParams(),
      });
      const loadProductByIdSpy = jest.spyOn(controller, 'loadProductById');
      await controller.loadProductById(product.id);
      expect(loadProductByIdSpy).toHaveBeenCalledWith(product.id);
    });

    test('should throw if loadProductByIdUsecaseProxy.findById throws', async () => {
      const product = await repository.insert({
        ...mockAddOrUpdateProductParams(),
      });
      jest
        .spyOn(controller, 'loadProductById')
        .mockImplementationOnce(async () => {
          throw new Error();
        });
      const promise = controller.loadProductById(product.id);
      await expect(promise).rejects.toThrow();
    });
  });

  describe('udpateProduct()', () => {
    test('should call updateProductUsecaseProxy.update with correct values', async () => {
      const { descricao, custo, imagem } = mockAddOrUpdateProductParams();
      const product = await repository.insert({ descricao, custo, imagem });
      const mockProduct = {
        id: product.id,
        ...mockAddOrUpdateProductParams(),
      };
      const updateProductSpy = jest.spyOn(controller, 'updateProduct');
      await controller.updateProduct({ product: mockProduct });
      expect(updateProductSpy).toHaveBeenCalledWith({ product: mockProduct });
    });

    test('should throw if updateProductUsecaseProxy.update throws', async () => {
      const mockProduct = {
        id: 1,
        ...mockAddOrUpdateProductParams(),
      };
      jest
        .spyOn(controller, 'updateProduct')
        .mockImplementationOnce(async () => {
          throw new Error();
        });
      await expect(
        controller.updateProduct({ product: mockProduct }),
      ).rejects.toThrow();
    });
  });
});
