import { ColumnNumericTransformer } from '../../main/transformers/numeric-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStore } from './product-store.entity';

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

  @Column({ type: 'bytea', nullable: true })
  imagem: Buffer;

  @OneToMany(() => ProductStore, (produtoLoja) => produtoLoja.produto)
  produtoLojas: ProductStore[];
}
