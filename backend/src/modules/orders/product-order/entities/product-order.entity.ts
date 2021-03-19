import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './../../orders/entities/order.entity';
import { Product } from './../../../products/entities/product.entity';
import { EProductOrderStatus } from './../enums/product-order-status.enum';

@Entity({ name: 'product_order' })
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, {nullable: false})
  @JoinColumn({ name: 'id_product' })
  product: Product;
  productId: number;
  
  @ManyToOne(() => Order, {nullable: false})
  @JoinColumn({ name: 'id_order' })
  order: Order;
  orderId: number;

  @Column({name: 'note', type: 'text', nullable: true})
  note: string;

  @Column({name: 'quantity_ordered', type: 'integer'})
  quantityOrdered: number;

  @Column({name: 'quantity_received', type: 'integer', nullable: true})
  quantityReceived: number;

  @Column({name: 'purchase_price_HT_at_date', type: 'decimal', nullable: true})
  purchasePriceHTAtDate: number;

  @Column({name: 'status', type: 'enum', enum: EProductOrderStatus})
  status: EProductOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
