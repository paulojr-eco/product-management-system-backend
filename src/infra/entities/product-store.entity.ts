import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

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

  @Column({ type: 'decimal', scale: 1, nullable: true })
  precoVenda: number;
}
