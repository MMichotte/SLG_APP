import { EFuelType } from './../enums/EFuelType.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Person } from '@modules/persons/entities/person.entity';
import { CarModel } from '@modules/cars/car-models/entities/car-model.entity';
import { Company } from '@modules/companies/entities/company.entity';

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, {nullable: true})
  @JoinColumn({ name: 'id_person' })
  person: Person;
  personId: number;

  @ManyToOne(() => Company, {nullable: true})
  @JoinColumn({ name: 'id_company' })
  company: Person;
  companyId: number;

  @ManyToOne(() => CarModel, {nullable: false})
  @JoinColumn({ name: 'id_car_model' })
  model: CarModel;
  modelId: number;

  @Column({name: 'version', type: 'varchar', length: 255, nullable: true })
  version: string;

  @Column({name: 'color', type: 'varchar', length: 255, nullable: true })
  color: string;

  @Column({name: 'fuel_type', type: 'enum', enum: EFuelType, nullable: true })
  fuelType: EFuelType;

  @Column({name: 'bodywork', type: 'varchar', length: 255, nullable: true })
  bodywork: string;

  @Column({name: 'registration_number', type: 'varchar', length: 255, nullable: true })
  registrationNumber: string;

  @Column({name: 'chassis_number', type: 'varchar', length: 255})
  chassisNumber: string;

  @Column({name: 'chassis_number_location', type: 'text',  nullable: true })
  chassisNumberLocation: string;

  @Column({name: 'engine_displacement', type: 'decimal', nullable: true})
  engineDisplacement: number;

  @Column({name: 'engine_number', type: 'varchar', length: 255, nullable: true})
  engineNumber: string;

  @Column({name: 'gearbox_type', type: 'varchar', length: 255, nullable: true})
  gearboxType: string;

  @Column({name: 'first_registration', type: 'date', nullable: true})
  firstRegistration: Date;

  @Column({name: 'note', type: 'text', nullable: true})
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
