import { EUserRoles } from '../constants/user-roles.enum';
export declare class CreateUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: EUserRoles;
    createdAt: Date;
    updatedAt: Date;
}
