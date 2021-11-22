import { Injectable } from '@nestjs/common';
import { CreateCarDTO } from '../dto/create-car.dto';
import { UpdateCarDTO } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity';
import { CarRepository } from '../repositories/car.repository';


@Injectable()
export class CarsService {
  constructor(
    private readonly carRepository: CarRepository
  ) { }

  findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: ['model', 'model.carMake', 'person', 'company'] });
  }

  findOneById(id: number): Promise<Car> {
    return this.carRepository.findOne({ where: { id }, relations: ['model','model.carMake', 'person', 'company'] });
  }

  findAllByOwnerId(id: number, ownerType: string): Promise<Car[]> {
    if (ownerType === 'p') {
      return this.carRepository.find({ where: { person: id }, relations: ['model', 'model.carMake', 'person', 'company']});
    } 
    return this.carRepository.find({ where: { company: id }, relations: ['model', 'model.carMake', 'person', 'company']});
  }
  
  findOneByChassisNumber(chassisNumber: string): Promise<Car> {
    return this.carRepository.findOne({ where: { chassisNumber: chassisNumber } });
  }

  create(carMake: CreateCarDTO): Promise<Car> {
    return this.carRepository.save(carMake);
  }

  async update(id: number, carMake: UpdateCarDTO): Promise<any> {
    return await this.carRepository.update(id, carMake);
  }

  remove(id: number) {
    return this.carRepository.delete(id);
  }
}
