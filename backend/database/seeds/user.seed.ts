import { CreateUserDTO } from '../../src/modules/users/dto/create-user.dto';
import { EUserRoles } from '../../src/modules/users/enums/user-roles.enum';

export const UserSeed: CreateUserDTO[] = [
  {
    firstName: 'Martin',
    lastName: 'Michotte',
    email: 'martin.michotte@gmail.com',
    password: '$2a$10$Wj3Sin3cTjcicS1i/J7uWeI69vqhy.OtTv2lix8SG9i7kOS1AL3Xq',
    role: EUserRoles.DEV
  },
  {
    firstName: 'Maxime',
    lastName: 'Slegers',
    email: 'maxime@slgcars.be',
    password: '$2a$10$Wj3Sin3cTjcicS1i/J7uWeI69vqhy.OtTv2lix8SG9i7kOS1AL3Xq',
    role: EUserRoles.ADMIN
  }
];