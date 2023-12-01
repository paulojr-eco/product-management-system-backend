import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loja' })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  descricao: string;
}
