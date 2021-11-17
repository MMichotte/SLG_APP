import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EOwnerType } from '@core/enums/owner-type.enum';

@Exclude()
export class LightOwnerDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  displayName: string;
  
  @Expose()
  @ApiProperty()
  type: EOwnerType;
  
  constructor(obj?: LightOwnerDTO) {
    Object.assign(this, obj);
  }
}
