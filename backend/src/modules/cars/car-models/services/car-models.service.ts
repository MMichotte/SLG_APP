import { Injectable } from '@nestjs/common';
import { CarModelRepository } from '../repositories/car-models.repository';
import { CarModel } from '../entities/car-model.entity';
import { CreateCarModelDTO } from '../dto/create-car-model.dto';
import { UpdateCarModelDTO } from '../dto/update-car-model.dto';


@Injectable()
export class CarModelsService {
  constructor(
    private readonly carModelRepository: CarModelRepository
  ) {}

  findAll(): Promise<CarModel[]> {
    return this.carModelRepository.find({relations: ['carMake']});
  }
  
  findOneById(id: number): Promise<CarModel> {
    return this.carModelRepository.findOne({ where: { id } });
  }
  
  findOneByLabelByMake(label: string, makeId: number): Promise<CarModel> {
    return this.carModelRepository.findOne({ where: { label: label, carMake: makeId } });
  }

  create(carMake: CreateCarModelDTO): Promise<CarModel> {
    return this.carModelRepository.save(carMake); 
  }
  
  async update(id: number, carMake: UpdateCarModelDTO): Promise<any> {
    return await this.carModelRepository.update(id, carMake); 
  }

  remove(id: number) {
    return this.carModelRepository.delete(id);
  }
}
