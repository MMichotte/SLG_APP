import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
