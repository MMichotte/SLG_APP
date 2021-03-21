import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Company } from '../../../companies/entities/company.entity';
import { EOrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supplierId: number
  supplier?: Company

  @ApiPropertyOptional({enum: EOrderStatus})
  @IsEnum(EOrderStatus)
  @IsOptional()
  status?: EOrderStatus;

  updatedAt?: Date = new Date();

  constructor(obj?: UpdateOrderDTO) {
    Object.assign(this, obj);
  }
}
