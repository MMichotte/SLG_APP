import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { SimpleUserDTO } from '../dto/simmple-user.dto';
import { User } from '../entities/user.entity';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { EUserRoles } from '../enums/user-roles.enum';

@Controller('users')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor( private readonly usersService: UsersService ) {}

  @Get()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: UserDTO,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: SimpleUserDTO,
  })
  async create(@Body() user: CreateUserDTO): Promise<SimpleUserDTO> {
    //check if email already exists.
    const existingUser: User = await this.usersService.findOneByEmail(user.email);
    if (existingUser) throw new HttpException('Email already taken', HttpStatus.UNAUTHORIZED);

    return await this.usersService.create(user);
  }
  
  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: SimpleUserDTO,
  })
  async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return await this.usersService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user: User | undefined = await this.usersService.findOneById(+id);
    if (user == undefined) throw new NotFoundException;
    if (user.role === EUserRoles.DEV) throw new HttpException('You are not allowed to delete a `dev` user!', HttpStatus.UNAUTHORIZED);
    await this.usersService.remove(+id);
    return [];
  }

}
