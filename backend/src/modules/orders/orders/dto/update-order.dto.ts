import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Company } from '../../../companies/entities/company.entity';
import { EOrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDTO {

  supplier?: Company

  @ApiProperty({enum: EOrderStatus})
  @IsEnum(EOrderStatus)
  @IsNotEmpty()
  status: EOrderStatus;

  updatedAt?: Date = new Date();

  constructor(obj?: UpdateOrderDTO) {
    Object.assign(this, obj);
  }
}
