import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStore } from '../../../domain/models/product-store';

class AddProductStoreClass {
  idProduto: number;
  idLoja: number;
  precoVenda?: number;
}

class UpdateProductStoreClass {
  id: number;
  idProduto: number;
  idLoja: number;
  precoVenda?: number;
}

export class AddProductStoreDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddProductStoreClass)
  readonly productStoreParams: Omit<ProductStore, 'id'>;
}

export class UpdateProductStoreDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductStoreClass)
  readonly productStoreParams: ProductStore;
}
