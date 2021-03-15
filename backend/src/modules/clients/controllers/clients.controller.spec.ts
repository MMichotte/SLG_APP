import { AddressRepository } from './../../adresses/repositories/address.repository';
import { AddressesService } from './../../adresses/services/addresses.service';
import { ClientRepository } from './../repositories/client.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService, ClientRepository, AddressesService, AddressRepository],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
