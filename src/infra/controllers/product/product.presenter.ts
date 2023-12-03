import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../domain/models/product';

export class ProductPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  image: Buffer;

  constructor(product: Product) {
    this.id = product.id;
    this.description = product.description;
    this.cost = product.cost;
    this.image = product.image;
  }
}
