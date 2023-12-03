import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStore } from './product-store.entity';

@Entity({ name: 'loja' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  descricao: string;

  @OneToMany(() => ProductStore, (produtoLoja) => produtoLoja.loja)
  produtosLoja: ProductStore[];
}
