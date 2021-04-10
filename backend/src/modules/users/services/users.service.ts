import { UserRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { EUserRoles } from '../enums/user-roles.enum';
import { BcryptService } from '@core/services/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    const noDevUsers: User[] = users.filter( (user) => {return user.role !== EUserRoles.DEV;} );
    return noDevUsers;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDTO): Promise<User> {
    user.password = await this.bcryptService.hashPassword(user.password);
    return await this.userRepository.save(user); 
  }
  
  async update(id: number, user: UpdateUserDTO): Promise<any> {
    user.password = await this.bcryptService.hashPassword(user.password);
    return await this.userRepository.update(id, user); 
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
