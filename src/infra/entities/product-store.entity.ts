import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ColumnNumericTransformer } from '../../main/transformers/numeric-transformer';

@Entity({ name: 'produtoloja' })
export class ProductStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @Column()
  idProduto: number;

  @ManyToOne(() => Product)
  @Column()
  idLoja: number;

  @Column({
    type: 'numeric',
    precision: 13,
    scale: 3,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  precoVenda: number;
}
