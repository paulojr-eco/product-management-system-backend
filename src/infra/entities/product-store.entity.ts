import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ColumnNumericTransformer } from '../../main/transformers/numeric-transformer';
import { Store } from './store.entity';

@Entity({ name: 'produtoloja' })
export class ProductStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (produto) => produto.produtoLojas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idProduto' })
  produto: Product;

  @ManyToOne(() => Store, (loja) => loja.produtosLoja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idLoja' })
  loja: Store;

  @Column()
  idProduto: number;

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
