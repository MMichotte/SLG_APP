import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarMakeDTO {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  label: string;
  
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
