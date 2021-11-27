import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SimpleWorkforceWorksheetDTO {
  
  @Expose()
  @ApiProperty()
  id: number;

}