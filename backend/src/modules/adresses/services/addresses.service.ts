import { UpdateAddressDTO } from './../dto/update-address.dto';
import { CreateAddressDTO } from './../dto/create-address.dto';
import { AddressRepository } from '../repositories/address.repository';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import { RedisService } from '@core/services/redis.service';

@Injectable()
export class AddressesService {

  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly redisService: RedisService
  ) {}

  findAll(): Promise<Address[]> {
    return this.redisService.getOrSetCache('addresses', () => {
      return this.addressRepository.find();
    });
  }
  
  findOneById(id: number): Promise<Address> {
    return this.addressRepository.findOne(id);
  }

  create(addr: CreateAddressDTO): Promise<Address> {
    this.redisService.resetCache('addresses');
    return this.addressRepository.save(addr); 
  }
  
  update(id: number, addr: UpdateAddressDTO): Promise<any> {
    this.redisService.resetCache('addresses');
    return this.addressRepository.update(id, addr); 
  }

  remove(id: number) {
    this.redisService.resetCache('addresses');
    return this.addressRepository.delete(id);
  }
}
