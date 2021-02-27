import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EUserRoles } from '../enums/user-roles.enum';

@Entity({ name: 'user' })
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'first_name', type: 'varchar', length: 255})
  firstName: string;

  @Column({name: 'last_name', type: 'varchar', length: 255})
  lastName: string;

  @Column({name: 'email', type: 'varchar', length: 255, unique: true})
  email: string;

  @Column({name: 'password', type: 'varchar'})
  password: string;

  @Column({name: 'role', type: 'enum', enum: EUserRoles})
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
