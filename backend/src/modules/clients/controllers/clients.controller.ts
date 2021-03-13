import { Controller } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
}
