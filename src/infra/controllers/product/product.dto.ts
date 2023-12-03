import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  AddProductParams,
  AddProductStoreParams,
} from 'src/domain/usecases/product/add-product';

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
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly productStoreParams: AddProductStoreParams;
}
