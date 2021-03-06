import { Workforce } from './../entities/workforce.entity';
import { WorkforceRepository } from './../repositories/workforce.repository';
import { Injectable } from '@nestjs/common';
import { CreateWorkforceDTO } from '../dto/create-workforce.dto';
import { UpdateWorkforceDTO } from '../dto/update-workforce.dto';

@Injectable()
export class WorkforcesService {

  constructor(
    private readonly workforceRepository: WorkforceRepository
  ) {}

  findAll(): Promise<Workforce[]> {
    return this.workforceRepository.find();
  }

  findOneById(id: number): Promise<Workforce> {
    return this.workforceRepository.findOne({where: {id}});
  }
  
  create(CreateProductDTO: CreateWorkforceDTO): Promise<Workforce> {
    return this.workforceRepository.save(CreateProductDTO);
  }

  update(id: number, updateProductDto: UpdateWorkforceDTO): Promise<any> {
    return this.workforceRepository.update(id,updateProductDto);  
  }

  remove(id: number) {
    return this.workforceRepository.delete(id);
  }
}
