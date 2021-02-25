import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleUserDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
