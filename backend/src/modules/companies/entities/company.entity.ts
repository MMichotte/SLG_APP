import { ECompanyType } from './../enums/company-type.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Index, ManyToOne } from 'typeorm';
import { Person } from '../../persons/entities/person.entity';
import { Address } from '../../adresses/entities/address.entity';

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'type', type: 'enum', enum: ECompanyType})
  type: ECompanyType;

  @Column({name: 'name', type: 'varchar', length: 255})
  name: string;
  
  @Column({name: 'email', type: 'varchar', length: 255, unique: true})
  @Index()
  email: string;
  
  @Column({name: 'vat_num', type: 'varchar', length: 255, nullable: true })
  @Index()
  VAT: string;

  @Column({name: 'phone_1', type: 'varchar', length: 50, nullable: true})
  phone1: string;
  
  @Column({name: 'phone_2', type: 'varchar', length: 50, nullable: true})
  phone2: string;
  
  @Column({name: 'mobile', type: 'varchar', length: 50, nullable: true})
  mobile: string;

  @Column({name: 'website', type: 'varchar', length: 255, nullable: true})
  website: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Person, {nullable: true})
  @JoinColumn({ name: 'id_person' })
  person: Person;
  personId: number;

  @OneToOne(() => Address, {nullable: true,  cascade: ['insert', 'update']})
  @JoinColumn({ name: 'id_address' })
  address: Address;
  addressId: number;

}
