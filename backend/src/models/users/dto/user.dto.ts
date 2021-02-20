import { IsInt } from "sequelize-typescript";
import { isString } from "util";
import { IsEnum, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { EUserRoles } from "../constants/user-roles.enum";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class UserDTO {
  
  @Expose()
  @ApiProperty()
  firstName: string;  
  
  @Expose()
  @ApiProperty()
  lastName: string;  
  
  @Expose()
  @ApiProperty()
  email: string;  

  @Expose()
  @ApiProperty({
    enum: EUserRoles,
  })
  role: EUserRoles;
}
