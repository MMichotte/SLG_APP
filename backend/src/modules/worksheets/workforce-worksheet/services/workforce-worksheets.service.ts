import { Injectable } from '@nestjs/common';
import { WorkforceWorksheet } from '../entities/workforce-worksheet.entity';
import { WorkforceWorksheetRepository } from '../repositories/workforce-worksheet.repository';
import { CreateWorkforceWorksheetDTO } from '../dto/create-workforce-worksheet.dto';
import { UpdateWorkforceWorksheetDTO } from '../dto/update-workforce-worksheet.dto';

@Injectable()
export class WorkforceWorksheetsService {

  constructor(
    private readonly workforceWorksheetRepository: WorkforceWorksheetRepository
  ) {}

    
  findAll(): Promise<WorkforceWorksheet[]> {
    return this.workforceWorksheetRepository.find({relations: ['workforce', 'worksheet']});
  }

  findOneById(id: number): Promise<WorkforceWorksheet> {
    return this.workforceWorksheetRepository.findOne({where: {id}, relations: ['workforce', 'worksheet']});
  }
  
  create(createWorkforceWorksheetDTO: CreateWorkforceWorksheetDTO): Promise<WorkforceWorksheet> {
    return this.workforceWorksheetRepository.save(createWorkforceWorksheetDTO);
  }

  update(id: number, updateWorkforceWorksheetDTO: UpdateWorkforceWorksheetDTO): Promise<any> {
    return this.workforceWorksheetRepository.update(id,updateWorkforceWorksheetDTO);  
  }

  remove(id: number) {
    return this.workforceWorksheetRepository.delete(id);
  }
}
