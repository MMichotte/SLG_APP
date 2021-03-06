import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'reference', type: 'varchar', length: 255, unique: true})
  @Index()
  reference: string;

  @Column({name: 'label', type: 'varchar', length: 255})
  @Index()
  label: string;

  @Column({name: 'purchase_price_HT', type: 'decimal'})
  purchasePriceHT: number;
  
  @Column({name: 'sale_price_HT', type: 'decimal'})
  salePriceHT: number;
  
  @Column({name: 'sale_price_TTC', type: 'decimal'})
  salePriceTTC: number;

  @Column({name: 'quantity', type: 'integer'})
  quantity: number;

  @Column({name: 'note', type: 'text', nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
