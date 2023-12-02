import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController],
})
export class ControllersModule {}
