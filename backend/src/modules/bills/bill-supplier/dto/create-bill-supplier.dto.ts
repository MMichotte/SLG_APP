import { UpdateProductOrderProcessDTO } from './../../../orders/product-order/dto/update-product-order-process.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBillSupplierDTO {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  invoiceNumber: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  shippingFees: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  debitedAmount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note: string; 

  @ApiProperty({type: UpdateProductOrderProcessDTO, isArray: true})
  @IsArray()
  @IsNotEmpty()
  productOrders: UpdateProductOrderProcessDTO[];

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateBillSupplierDTO) {
    Object.assign(this, obj);
  }
}
