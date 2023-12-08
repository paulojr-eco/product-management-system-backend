import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { appDataSource } from '../src/data/helpers/database-helper';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let store;
  let product;

  beforeAll(async () => {
    await appDataSource.initialize();
    store = await appDataSource.getRepository('loja').save({
      descricao: 'any description',
    });
    product = await appDataSource.getRepository('produto').save({
      descricao: 'any description',
      custo: faker.number.float({
        min: 0,
        max: 9999999999,
        precision: 0.001,
      }),
      imagem: Buffer.from(faker.image.avatar(), 'utf-8'),
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await appDataSource.destroy();
    await sleep(100);
  });

  describe('/products (GET)', () => {
    test('should return 200 on load products', () => {
      return request(app.getHttpServer()).get('/products').expect(200);
    });
  });

  describe('/product (POST)', () => {
    test('should return 201 on create product', async () => {
      return request(app.getHttpServer())
        .post('/product')
        .send({
          productParams: {
            descricao: 'any description',
            custo: faker.number.float({
              min: 0,
              max: 9999999999,
              precision: 0.001,
            }),
            imagem: Buffer.from(faker.image.avatar(), 'utf-8'),
          },
          productStoreParams: [
            {
              idLoja: store.id,
              precoVenda: 99.99,
            },
          ],
        })
        .expect(201);
    });
  });

  describe('/product/:id (GET)', () => {
    test('should return 200 on load product', () => {
      return request(app.getHttpServer())
        .get(`/product/${product.id}`)
        .send()
        .expect(200);
    });
  });

  describe('/product/:id (PATCH)', () => {
    test('should return 200 on update product', () => {
      return request(app.getHttpServer())
        .patch(`/product`)
        .send({
          product: {
            id: product.id,
            descricao: 'new description',
            custo: 96.123,
            imagem: 'new image',
          },
        })
        .expect(200);
    });
  });

  describe('/product/:id (DELETE)', () => {
    test('should return 200 on delete product', () => {
      return request(app.getHttpServer())
        .delete(`/product/${product.id}`)
        .expect(200);
    });
  });
});
