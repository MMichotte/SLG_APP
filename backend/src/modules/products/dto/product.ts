import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class ProductDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  reference: string;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  purchasePriceHT: number;
  
  @Expose()
  @ApiProperty()
  salePriceHT: number;
  
  @Expose()
  @ApiProperty()
  salePriceTTC: number;
  
  @Expose()
  @ApiProperty()
  quantity: number;
  
  @Expose()
  @ApiProperty()
  reservedQuantity: number;

  @Expose()
  @ApiPropertyOptional()
  note?: string;
  
  constructor(obj?: ProductDTO) {
    Object.assign(this, obj);
  }
}
