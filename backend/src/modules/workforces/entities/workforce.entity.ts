import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ name: 'workforce' })
export class Workforce {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'label', type: 'varchar', length: 255})
  @Index()
  label: string;
  
  @Column({name: 'price_HT', type: 'decimal'})
  priceHT: number;
  
  @Column({name: 'price_TTC', type: 'decimal'})
  priceTTC: number;

  @Column({name: 'note', type: 'text', nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
