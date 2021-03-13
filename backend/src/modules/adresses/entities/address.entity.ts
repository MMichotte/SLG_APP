import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'country', type: 'varchar', length: 255})
  country: string;

  @Column({name: 'city', type: 'varchar', length: 255})
  city: string;
  
  @Column({name: 'zip_code', type: 'varchar', length: 50})
  zipCode: string;
  
  @Column({name: 'street_address', type: 'varchar', length: 255})
  streetAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
