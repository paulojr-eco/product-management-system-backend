import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ProductController } from './product/product.controller';
import { ProductStoreController } from './product-store/product-store.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController, ProductStoreController],
})
export class ControllersModule {}
