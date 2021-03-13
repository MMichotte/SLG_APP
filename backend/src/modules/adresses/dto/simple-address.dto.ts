import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleAddressDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
