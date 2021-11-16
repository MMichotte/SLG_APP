import { CarMake } from '@modules/cars/car-makes/entities/car-make.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'car_model' })
export class CarModel {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'label', type: 'varchar', length: 255, unique: true})
  label: string;

  @ManyToOne(() => CarMake, {nullable: false})
  @JoinColumn({ name: 'id_car_make' })
  carMake: CarMake;
  carMakeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}