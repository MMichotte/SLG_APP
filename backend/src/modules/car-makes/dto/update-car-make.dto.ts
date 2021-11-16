import { PartialType } from '@nestjs/mapped-types';
import { CreateCarMakeDTO } from './create-car-make.dto';

export class UpdateCarMakeDTO extends PartialType(CreateCarMakeDTO) {}
