import { ApiProperty } from '@nestjs/swagger';

export class SimpleUserDTO {
  @ApiProperty()
  id: number;
}
