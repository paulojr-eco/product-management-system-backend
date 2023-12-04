import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import {
  AddProductParams,
  AddProductStoreParams,
} from '../../../domain/usecases/product/add-product';
import { Type } from 'class-transformer';
import { Product } from '../../../domain/models/product';

class ProductClass {
  id: number;
  descricao: string;
  custo?: number;
  imagem?: Buffer;
}

class AddProductStoreClass {
  idLoja: number;
  precoVenda?: number;
}
export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductClass)
  readonly product: Product;
}

export class AddProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly productParams: AddProductParams;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddProductStoreClass)
  readonly productStoreParams: AddProductStoreParams[];
}
