import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductDTO } from '@modules/products/dto/product';

@Exclude()
export class ProductWorksheetDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({type: ProductDTO})
  product: ProductDTO;
  
  @Expose()
  @Transform(({ obj }) => obj.worksheet?.id)
  @ApiProperty()
  worksheetId: number;
    
  @Expose()
  @ApiProperty()
  quantity: number;

  @Expose()
  @ApiProperty()
  salePriceAtDate: number;
  
  @Expose()
  @ApiPropertyOptional()
  note?: string;

  constructor(obj?: ProductWorksheetDTO) {
    Object.assign(this, obj);
  }
}
