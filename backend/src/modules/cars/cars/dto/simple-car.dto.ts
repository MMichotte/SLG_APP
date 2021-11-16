import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleCarDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
