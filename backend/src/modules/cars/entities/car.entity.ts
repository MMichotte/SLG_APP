import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Index, ManyToOne } from 'typeorm';
import { Person } from '@modules/persons/entities/person.entity';

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'brand', type: 'varchar', length: 255})
  brand: string;

  @Column({name: 'model', type: 'varchar', length: 255})
  model: string;

  @Column({name: 'version', type: 'varchar', length: 255, nullable: true })
  version: string;

  @Column({name: 'color', type: 'varchar', length: 255})
  color: string;

  @Column({name: 'fuel_type', type: 'varchar', length: 255})
  fuelType: string; //TODO ENUM 

  @Column({name: 'bodywork', type: 'varchar', length: 255, nullable: true })
  bodywork: string;

  @Column({name: 'registration_number', type: 'varchar', length: 255})
  registrationNumber: string;

  @Column({name: 'chassis_number', type: 'varchar', length: 255})
  chassisNumber: string;

  @Column({name: 'chassis_number_location', type: 'varchar', length: 255})
  chassisNumberLocation: string;




  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Person, {nullable: true})
  @JoinColumn({ name: 'id_person' })
  person: Person;
  personId: number;



}
