import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SimpleBillSupplierDTO {

  @Expose()
  @ApiProperty()
  id: number;

}