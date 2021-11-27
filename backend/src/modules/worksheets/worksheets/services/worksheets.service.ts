import { Injectable } from '@nestjs/common';
import { CreateWorksheetDTO } from '../dto/create-worksheet.dto';
import { UpdateWorksheetDTO } from '../dto/update-worksheet.dto';
import { Worksheet } from '../entities/worksheet.entity';
import { WorksheetRepository } from '../repositories/worksheet.repository';

@Injectable()
export class WorksheetsService {

  constructor(
    private readonly worksheetRepository: WorksheetRepository
  ) {}

    
  findAll(): Promise<Worksheet[]> {
    return this.worksheetRepository.find({relations: ['car', 'person', 'company']});
  }

  findOneById(id: number): Promise<Worksheet> {
    return this.worksheetRepository.findOne({where: {id}, relations: ['car', 'person', 'company']});
  }
  
  create(createWorksheetDTO: CreateWorksheetDTO): Promise<Worksheet> {
    return this.worksheetRepository.save(createWorksheetDTO);
  }

  update(id: number, updateWorksheetDTO: UpdateWorksheetDTO): Promise<any> {
    return this.worksheetRepository.update(id,updateWorksheetDTO);  
  }

  remove(id: number) {
    return this.worksheetRepository.delete(id);
  }
}
