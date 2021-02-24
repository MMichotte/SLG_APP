import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EUserRoles } from '../enums/user-roles.enum';

@Entity({ name: 'user' })
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255
  })
  firstName: string;

  @Column({
    length: 255
  })
  lastName: string;

  @Column({
    unique: true,
    length:255
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: EUserRoles
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
