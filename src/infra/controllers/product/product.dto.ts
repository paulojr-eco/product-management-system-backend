import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import {
  AddProductParams,
  AddProductStoreParams,
} from '../../../domain/usecases/product/add-product';
import { Type } from 'class-transformer';

class AddProductStoreClass {
  idLoja: number;
  precoVenda?: number;
}
export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
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
