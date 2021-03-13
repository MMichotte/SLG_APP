import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleCompanyDTO {
  
  @Expose()
  @ApiProperty()
  id: number;
}
