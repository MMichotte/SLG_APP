import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { EUserRoles } from '../constants/user-roles.enum';

@Table({
  tableName: 'user'
})
export class User extends Model<User>{
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: Number;

  @Column({
    type: DataType.STRING(255),
    unique: false,
    allowNull: false
  })
  firstName: string;
  
  @Column({
    type: DataType.STRING(255),
    unique: false,
    allowNull: false
  })
  lastName: string;
  
  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  })
  email: string;
  
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    validate: {
      is: /^[0-9a-f]{64}$/i
    }
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    //values: ['accounting', 'user', 'admin', 'dev'],
    values: Object.values(EUserRoles),
    unique: false,
    allowNull: false
  })
  role: String;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
    allowNull: false
  })
  createdAt: Date;

   @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
    allowNull: false
  })
  updatedAt: Date;

}
