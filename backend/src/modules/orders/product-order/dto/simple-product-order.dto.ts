import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class SimpleProductOrderDTO {
  @Expose()
  @ApiProperty()
  id: number;
}
