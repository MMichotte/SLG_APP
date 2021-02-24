import { Exclude, Expose } from 'class-transformer';
import { EUserRoles } from '../enums/user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserDTO {
  @Expose()
  @ApiProperty()
  id: number;

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
