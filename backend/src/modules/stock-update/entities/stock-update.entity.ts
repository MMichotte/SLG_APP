import { Product } from '@modules/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EStockUpdateType } from '../enums/stock-update-type.enum';

@Entity({ name: 'stock_update' })
export class StockUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'type', type: 'enum', enum: EStockUpdateType})
  type: EStockUpdateType;

  @Column({name: 'quantity', type: 'integer'})
  quantity: number;

  @Column({name: 'note', type: 'text', nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, {nullable: false})
  @JoinColumn({ name: 'id_product' })
  product: Product;
  productId: number;

}
