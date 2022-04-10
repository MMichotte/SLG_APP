import { ECompanyType } from './../enums/company-type.enum';
import { CompanyRepository } from './../repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { CreateCompanyDTO } from '../dto/create-company.dto';
import { Company } from '../entities/company.entity';
import { UpdateCompanyDTO } from '../dto/update-company.dto';
import { RedisService } from '@core/services/redis.service';

@Injectable()
export class CompaniesService {

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly redisService: RedisService
  ) { }

  findAll(): Promise<Company[]> {
    return this.redisService.getOrSetCache('companies', () => {
      return this.companyRepository.find({ relations: ['person', 'address'] });
    });
  }
  
  findAllSuppliers(): Promise<Company[]> {
    return this.redisService.getOrSetCache('suppliers', () => {
      return this.companyRepository.find({ where: [{ type: ECompanyType.SUPPLIER }, { type: ECompanyType.SUPP_AND_CLI }], relations: ['person', 'address'] });
    });
  }

  findAllClients(): Promise<Company[]> {
    return this.redisService.getOrSetCache('clients', () => {
      return this.companyRepository.find({ where: [{ type: ECompanyType.CLIENT }, { type: ECompanyType.SUPP_AND_CLI }], relations: ['person', 'address'] });
    });
  }
  
  findAllClientsLight(): Promise<Company[]> {
    return this.redisService.getOrSetCache('light-clients', () => {
      return this.companyRepository.find({ where: [{ type: ECompanyType.CLIENT }, { type: ECompanyType.SUPP_AND_CLI }], select: ['id', 'name'] });
    });
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
    this.resetCache();
    return this.companyRepository.save(Company);
  }

  update(id: number, Company: UpdateCompanyDTO): Promise<any> {
    this.resetCache();
    return this.companyRepository.update(id, Company);
  }

  remove(id: number) {
    this.resetCache();
    return this.companyRepository.delete(id);
  }

  private resetCache() {
    this.redisService.resetCache('companies');
    this.redisService.resetCache('suppliers');
    this.redisService.resetCache('clients');
    this.redisService.resetCache('light-clients');
  }
}
