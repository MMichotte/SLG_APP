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
}
