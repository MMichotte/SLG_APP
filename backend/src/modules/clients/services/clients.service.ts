import { UpdateClientDTO } from './../dto/update-client.dto';
import { CreateClientDTO } from './../dto/create-client.dto';
import { ClientRepository } from './../repositories/client.repository';
import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { Not } from 'typeorm';

@Injectable()
export class ClientsService {

  constructor(
    private readonly clientRepository: ClientRepository
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepository.find({relations: ['address']});  
  }

  findOneById(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id }, relations: ['address'] });
  }

  findOneByEmail(email: string): Promise<Client> {
    return this.clientRepository.findOne({ where: { email }, relations: ['address'] });
  }
  
  findOtherByEmail(myId: number, email: string): Promise<Client> {
    return this.clientRepository.findOne({ where: { email, id: Not(myId) }, relations: ['address'] });
  }

  create(client: CreateClientDTO): Promise<Client> {
    return this.clientRepository.save(client); 
  }
  
  update(id: number, client: UpdateClientDTO): Promise<any> {
    return this.clientRepository.update(id, client); 
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
