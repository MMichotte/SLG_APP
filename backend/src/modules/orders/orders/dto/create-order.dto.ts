import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from '../../../companies/entities/company.entity';
import { EOrderStatus } from '../enums/order-status.enum';

export class CreateOrderDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number
  supplier?: Company

  status?: EOrderStatus = EOrderStatus.OPEN;
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateOrderDTO) {
    Object.assign(this, obj);
  }
}
