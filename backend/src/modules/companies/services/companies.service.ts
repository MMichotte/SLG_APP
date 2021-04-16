import { ECompanyType } from './../enums/company-type.enum';
import { CompanyRepository } from './../repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { CreateCompanyDTO } from '../dto/create-company.dto';
import { Company } from '../entities/company.entity';
import { UpdateCompanyDTO } from '../dto/update-company.dto';

@Injectable()
export class CompaniesService {

  constructor(
    private readonly companyRepository: CompanyRepository
  ) { }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['person', 'address'] });
  }

  findAllSuppliers(): Promise<Company[]> {
    return this.companyRepository.find({ where: [{ type: ECompanyType.SUPPLIER }, { type: ECompanyType.SUPP_AND_CLI }], relations: ['person', 'address'] });
  }

  findAllClients(): Promise<Company[]> {
    return this.companyRepository.find({ where: [{ type: ECompanyType.CLIENT }, { type: ECompanyType.SUPP_AND_CLI }], relations: ['person', 'address'] });
  }

  findOneById(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id }, relations: ['person', 'address'] });
  }

  findOneByEmail(email: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { email }, relations: ['address'] });
  }

  findOneByEmailOrVAT(email: string, VAT: string): Promise<Company> {
    return this.companyRepository.findOne({
      where: [
        { email: email },
        { VAT: [VAT, Not(IsNull())] }
      ],
      relations: ['person', 'address']
    });
  }

  findOtherByEmail(myId: number, email: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { email, id: Not(myId) }, relations: ['address'] });
  }

  findOtherByVAT(myId: number, VAT: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { VAT, id: Not(myId) }, relations: ['address'] });
  }

  create(Company: CreateCompanyDTO): Promise<Company> {
    return this.companyRepository.save(Company);
  }

  update(id: number, Company: UpdateCompanyDTO): Promise<any> {
    return this.companyRepository.update(id, Company);
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
