import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleWorkforceDTO {
  
  @Expose()
  @ApiProperty()
  id: number;

}