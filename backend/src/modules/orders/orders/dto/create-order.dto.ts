import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from '../../../companies/entities/company.entity';

export class CreateOrderDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number
  supplier?: Company

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateOrderDTO) {
    Object.assign(this, obj);
  }
}
