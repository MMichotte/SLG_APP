import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from '../../../companies/entities/company.entity';

export class UpdateOrderDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number
  supplier?: Company

  updatedAt?: Date = new Date();

  constructor(obj?: UpdateOrderDTO) {
    Object.assign(this, obj);
  }
}
