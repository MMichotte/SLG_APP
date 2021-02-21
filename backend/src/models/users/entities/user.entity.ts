import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { EUserRoles } from '../constants/user-roles.enum';

@Table({
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    unique: false,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(255),
    unique: false,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    //! todo validate it is a hash
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(EUserRoles),
    unique: false,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
    allowNull: false,
  })
  updatedAt: Date;
}
