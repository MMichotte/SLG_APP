import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleWorksheetDTO {
  
  @Expose()
  @ApiProperty()
  id: number;

}