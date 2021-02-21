import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { BcryptService } from '../../common/helpers/bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    BcryptService, 
    ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
