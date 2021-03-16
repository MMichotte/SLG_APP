import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimplePersonDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
