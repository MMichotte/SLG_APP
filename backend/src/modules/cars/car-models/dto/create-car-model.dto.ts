import { CarMake } from '@modules/cars/car-makes/entities/car-make.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarModelDTO {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  carMakeId: number;
  carMake?: CarMake;
  
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
