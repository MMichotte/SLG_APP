import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class DataLastUpdatedAtDTO {
  @Expose()
  @ApiProperty()
  lastUpdatedAt: string;
  
  constructor(obj?: DataLastUpdatedAtDTO) {
    Object.assign(this, obj);
  }
}
