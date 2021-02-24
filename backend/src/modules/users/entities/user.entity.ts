import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EUserRoles } from '../enums/user-roles.enum';

@Entity({ name: 'user' })
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: EUserRoles
  })
  role: string;

  @Column({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;

  @Column({
    type: 'date',
    default: new Date()
  })
  updatedAt: Date;

}
