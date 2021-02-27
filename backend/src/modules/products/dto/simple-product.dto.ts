import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleProductDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
