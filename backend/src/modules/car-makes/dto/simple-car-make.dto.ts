import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleCarMakeDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
