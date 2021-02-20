import { UserDTO } from './dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {

  constructor (
    @Inject('USERS_REPOSITORY') private userRepository: typeof User
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.findAll<User>();
    return plainToClass(UserDTO, users);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({where: { email }})
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({where: { id }})
  }

}
