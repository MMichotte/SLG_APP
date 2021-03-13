import { Controller } from '@nestjs/common';
import { AdressesService } from '../services/adresses.service';

@Controller('adresses')
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}
}
