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

  findAll(): UserDTO {
    const users = this.userRepository.findAll<User>();
    const dto = plainToClass(UserDTO, users);
    console.log(dto);
    return dto;
  }

  findOne(email: string) {
    return this.userRepository.findOne<User>({where: { email }})
  }

}
