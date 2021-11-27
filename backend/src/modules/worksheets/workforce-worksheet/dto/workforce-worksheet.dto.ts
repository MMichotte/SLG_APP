import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkforceDTO } from '@modules/workforces/dto/workforce.dto';

@Exclude()
export class WorkforceWorksheetDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({type: WorkforceDTO})
  workforce: WorkforceDTO;
  
  @Expose()
  @Transform(({ obj }) => obj.worksheet?.id)
  @ApiPropertyOptional()
  worksheetId?: number;
    
  @Expose()
  @ApiProperty()
  hours: number;
  
  @Expose()
  @ApiPropertyOptional()
  note?: string;

  constructor(obj?: WorkforceWorksheetDTO) {
    Object.assign(this, obj);
  }
}
