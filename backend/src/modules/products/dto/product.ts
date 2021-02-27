import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  quantityReserved: number;

  @Expose()
  @ApiProperty()
  note: string;
  
}
