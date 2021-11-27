import { Product } from '@modules/products/entities/product.entity';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'product-worksheet' })
export class ProductWorksheet {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, {nullable: false})
  @JoinColumn({ name: 'id_product' })
  product: Product;
  productId: number;
  
  @ManyToOne(() => Worksheet, {nullable: false})
  @JoinColumn({ name: 'id_worksheet' })
  worksheet: Worksheet;
  worksheetId: number;
  
  @Column({name: 'quantity', type: 'integer', nullable: false})
  quantity: number;
  
  @Column({name: 'sale_price_at_date', type: 'decimal', nullable: false})
  salePriceAtDate: number;
  
  @Column({name: 'note', type: 'text', nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}