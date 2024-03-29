import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleCarModelDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
