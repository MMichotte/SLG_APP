import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LightProductDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  reference: string;

  @Expose()
  @ApiProperty()
  label: string;

  constructor(obj?: LightProductDTO) {
    Object.assign(this, obj);
  }
}
