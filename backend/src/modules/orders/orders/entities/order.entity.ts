import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { EOrderStatus } from '../enums/order-status.enum';
import { Company } from './../../../companies/entities/company.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, {nullable: false})
  @JoinColumn({ name: 'id_company' })
  supplier: Company;
  supplierId: number;

  @Column({name: 'status', type: 'enum', enum: EOrderStatus})
  status: EOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
