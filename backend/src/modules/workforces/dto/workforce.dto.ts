import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class WorkforceDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  priceHT: number;
  
  @Expose()
  @ApiProperty()
  priceTTC: number;
  
  @Expose()
  @ApiPropertyOptional()
  note: string;
  
  constructor(obj?: WorkforceDTO) {
    Object.assign(this, obj);
  }
}
