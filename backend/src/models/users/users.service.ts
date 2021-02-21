import { UserDTO } from './dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { EUserRoles } from './constants/user-roles.enum';
import { BcryptService } from '../../common/helpers/bcrypt.service';
import { SimpleUserDTO } from './dto/simmple-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private readonly bcryptService: BcryptService
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.findAll<User>();
    const noDevUsers: User[] = users.filter( (user) => {return user.role !== EUserRoles.DEV;} );
    return plainToClass(UserDTO, noDevUsers);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async create(user: CreateUserDTO): Promise<SimpleUserDTO> {
    // todo -> changer le any du create ?
    user.password = await this.bcryptService.hashPassword(user.password);
    const createdUser = await this.userRepository.create<any>(user); 
    return {id: createdUser.id};
  }
  
  async update(id: number, user: UpdateUserDTO) {
    // todo
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id }});
  }
}
