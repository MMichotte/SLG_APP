import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Index } from 'typeorm';
import { ECivility } from '../enums/ECivility.enum';
import { Address } from '../../adresses/entities/address.entity';

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'civility', type: 'enum', enum: ECivility})
  civility: ECivility;

  @Column({name: 'first_name', type: 'varchar', length: 255})
  firstName: string;
  
  @Column({name: 'last_name', type: 'varchar', length: 255})
  @Index()
  lastName: string;
  
  @Column({name: 'email', type: 'varchar', length: 255, unique: true})
  @Index()
  email: string;
  
  @Column({name: 'phone', type: 'varchar', length: 255, nullable: true})
  phone?: string;
  
  @Column({name: 'mobile', type: 'varchar', length: 255, nullable: true})
  mobile?: string;

  @Column({name: 'vat_num', type: 'varchar', length: 255, nullable: true })
  @Index()
  VAT: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, {nullable: true, cascade: ['insert', 'update']})
  @JoinColumn({ name: 'id_address' })
  address?: Address;

  addressId?: number;

}
