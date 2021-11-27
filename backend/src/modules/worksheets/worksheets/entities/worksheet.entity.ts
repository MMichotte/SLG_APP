import { Car } from '@modules/cars/cars/entities/car.entity';
import { Company } from '@modules/companies/entities/company.entity';
import { Person } from '@modules/persons/entities/person.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Check } from 'typeorm';

@Entity({ name: 'worksheet' })
@Check(`
  ("id_car" IS NOT NULL AND "id_person" IS NULL AND "id_company" IS NULL)
  OR ("id_car" IS NULL AND "id_person" IS NOT NULL AND "id_company" IS NULL)
  OR ("id_car" IS NULL AND "id_person" IS NULL AND "id_company" IS NOT NULL)
`)
export class Worksheet {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, {nullable: true})
  @JoinColumn({ name: 'id_car' })
  car: Car;
  carId: number;
  
  @ManyToOne(() => Person, {nullable: true})
  @JoinColumn({ name: 'id_person' })
  person: Person;
  personId: number;
  
  @ManyToOne(() => Company, {nullable: true})
  @JoinColumn({ name: 'id_company' })
  company: Company;
  companyId: number;

  @Column({name: 'is_active', type: 'boolean', nullable: false})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
