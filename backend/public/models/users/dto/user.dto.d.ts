import { EUserRoles } from '../constants/user-roles.enum';
export declare class UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: EUserRoles;
}
