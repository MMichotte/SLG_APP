import { EUserRoles } from '../enums/user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: EUserRoles,
  })
  @IsEnum(EUserRoles)
  @IsNotEmpty()
  role: EUserRoles;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
