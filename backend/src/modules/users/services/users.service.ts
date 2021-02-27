import { UserRepository } from './../repositories/users.repository';
import { UserDTO } from '../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { EUserRoles } from '../enums/user-roles.enum';
import { BcryptService } from '../../../core/helpers/bcrypt.service';
import { SimpleUserDTO } from '../dto/simmple-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find();
    const noDevUsers: User[] = users.filter( (user) => {return user.role !== EUserRoles.DEV;} );
    return plainToClass(UserDTO, noDevUsers);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDTO): Promise<SimpleUserDTO> {
    user.password = await this.bcryptService.hashPassword(user.password);
    const createdUser = await this.userRepository.save(user); 
    return plainToClass(SimpleUserDTO, createdUser);
  }
  
  async update(id: number, user: UpdateUserDTO): Promise<SimpleUserDTO> {
    user.password = await this.bcryptService.hashPassword(user.password);
    const updatedUser: any = await this.userRepository.update(id, user);  //TODO change type
    return plainToClass(SimpleUserDTO, updatedUser);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
