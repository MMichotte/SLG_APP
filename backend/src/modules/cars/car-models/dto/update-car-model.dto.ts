import { PartialType } from '@nestjs/mapped-types';
import { CreateCarModelDTO } from './create-car-model.dto';

export class UpdateCarModelDTO extends PartialType(CreateCarModelDTO) {}
