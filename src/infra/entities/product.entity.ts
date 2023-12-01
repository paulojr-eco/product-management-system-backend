import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  descricao: string;

  @Column({ type: 'decimal', scale: 1, nullable: true })
  custo: number;

  @Column({ nullable: true })
  imagem: string;
}
