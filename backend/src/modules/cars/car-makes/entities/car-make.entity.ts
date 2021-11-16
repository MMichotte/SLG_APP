import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'car_make' })
export class CarMake {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'label', type: 'varchar', length: 255, unique: true})
  label: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}