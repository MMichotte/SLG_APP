import { Workforce } from '@modules/workforces/entities/workforce.entity';
import { Worksheet } from '@modules/worksheets/worksheets/entities/worksheet.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkforceWorksheetDTO {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  workforceId: number;
  workforce?: Workforce;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  worksheetId: number;
  worksheet?: Worksheet;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  hours: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(obj?: CreateWorkforceWorksheetDTO) {
    Object.assign(this, obj);
  }
}
