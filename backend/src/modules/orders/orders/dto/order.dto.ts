import { CompanyDTO } from './../../../companies/dto/company.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class OrderDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({type: CompanyDTO})
  supplier: CompanyDTO

  @Expose()
  @ApiProperty()
  createdAt: Date;
  
  @Expose()
  @ApiProperty()
  updatedAt: Date;

  constructor(obj?: OrderDTO) {
    Object.assign(this, obj);
  }
}
