import { Injectable } from '@nestjs/common';
import { CarMakeRepository } from '../repositories/car-makes.repository';
import { CarMake } from '../entities/car-make.entity';
import { CreateCarMakeDTO } from '../dto/create-car-make.dto';
import { UpdateCarMakeDTO } from '../dto/update-car-make.dto';


@Injectable()
export class CarMakesService {
  constructor(
    private readonly carMakeRepository: CarMakeRepository
  ) {}

  findAll(): Promise<CarMake[]> {
    return this.carMakeRepository.find();
  }
  
  findOneById(id: number): Promise<CarMake> {
    return this.carMakeRepository.findOne({ where: { id } });
  }
  
  findOneByLabel(label: string): Promise<CarMake> {
    return this.carMakeRepository.findOne({ where: { label: label } });
  }

  create(carMake: CreateCarMakeDTO): Promise<CarMake> {
    return this.carMakeRepository.save(carMake); 
  }
  
  async update(id: number, carMake: UpdateCarMakeDTO): Promise<any> {
    return await this.carMakeRepository.update(id, carMake); 
  }

  remove(id: number) {
    return this.carMakeRepository.delete(id);
  }
}
