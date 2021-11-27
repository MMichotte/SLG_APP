import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleProductWorksheetDTO {
  
  @Expose()
  @ApiProperty()
  id: number;

}