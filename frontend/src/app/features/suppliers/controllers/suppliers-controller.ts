import { Injectable } from '@angular/core';
import { CreateCompanyDTO } from '../../companies/dto/create-company.dto';
import { UpdateCompanyDTO } from '../../companies/dto/update-company.dto';
import { CompaniesService } from '../../companies/services/companies.service';

@Injectable()
export class SuppliersController {

  constructor (
    private readonly companiesService: CompaniesService
  ) { }

  getAll(): any {
    return this.companiesService.getAllSuppliers();
  }
  
  getAllLights(): any {
    return this.companiesService.getAllLightSuppliers();
  }

  getOne(id: number): any {
    return this.companiesService.getOne(id);
  }

  createCompany(dto: CreateCompanyDTO): any {
    return this.companiesService.create(dto);
  }
  
  updateCompany(id: number, dto: UpdateCompanyDTO): any {
    return this.companiesService.update(id, dto);
  }
  
  delete (id: number): any {
    return this.companiesService.delete(id);
  }
}
