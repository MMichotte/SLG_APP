import { UpdateAddressDTO } from './../dto/update-address.dto';
import { CreateAddressDTO } from './../dto/create-address.dto';
import { AddressRepository } from '../repositories/address.repository';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressesService {

  constructor(
    private readonly addressRepository: AddressRepository
  ) {}

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }
  
  findOneById(id: number): Promise<Address> {
    return this.addressRepository.findOne(id);
  }

  create(addr: CreateAddressDTO): Promise<Address> {
    return this.addressRepository.save(addr); 
  }
  
  update(id: number, addr: UpdateAddressDTO): Promise<any> {
    return this.addressRepository.update(id, addr); 
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
