import { ColumnNumericTransformer } from '../../main/transformers/numeric-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  descricao: string;

  @Column({
    type: 'numeric',
    precision: 13,
    scale: 3,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  custo: number;

  @Column({ nullable: true })
  imagem: string;
}
