import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity({ name: 'bill_supplier' })
export class BillSupplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'invoice_number', type: 'varchar', nullable: true})
  invoiceNumber: string;
  
  @Column({name: 'shipping_fees', type: 'decimal', nullable: true})
  shippingFees: number;
  
  @Column({name: 'debited_amount', type: 'decimal', nullable: false})
  debitedAmount: number;

  @Column({name: 'note', type: 'text', nullable: true})
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
