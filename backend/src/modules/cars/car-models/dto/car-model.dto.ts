import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CarMakeDTO } from '@modules/cars/car-makes/dto/car-make.dto';

@Exclude()
export class CarModelDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty({type: CarMakeDTO})
  carMake: CarMakeDTO

  constructor(obj?: CarModelDTO) {
    Object.assign(this, obj);
  }
}
