import { PersonsService } from './../../persons/services/persons.service';
import { UpdateCompanyDTO } from './../dto/update-company.dto';
import { CreateCompanyDTO } from './../dto/create-company.dto';
import { SimpleCompanyDTO } from './../dto/simple-company.dto';
import { Company } from './../entities/company.entity';
import { EUserRoles } from './../../users/enums/user-roles.enum';
import { CompanyDTO } from './../dto/company.dto';
import { Roles } from './../../../core/decorators/roles.decorator';
import { Body, Controller, Get, Param, Post, UseGuards, ConflictException, Delete, NotFoundException, Patch, BadRequestException } from '@nestjs/common';
import { AddressesService } from './../../adresses/services/addresses.service';
import { CompaniesService } from '../services/companies.service';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { plainToClass } from 'class-transformer';
import { Address } from '../../adresses/entities/address.entity';
import { Person } from '../../persons/entities/person.entity';
import { validate } from 'class-validator';
import { LightCompanyDTO } from '../dto/light-company.dto';

@Controller('companies')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('companies')
@ApiBearerAuth()
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly personsService: PersonsService,
    private readonly addressService: AddressesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CompanyDTO,
    isArray: true
  })
  async findAll(): Promise<CompanyDTO[]> {
    const companies: Company[] = await this.companiesService.findAll();
    return plainToClass(CompanyDTO,companies);
  }

  @Get('clients')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CompanyDTO,
    isArray: true
  })
  async findAllClients(): Promise<CompanyDTO[]> {
    const companies: Company[] = await this.companiesService.findAllClients();
    return plainToClass(CompanyDTO,companies);
  }

  @Get('suppliers')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CompanyDTO,
    isArray: true
  })
  async findAllSuppliers(): Promise<CompanyDTO[]> {
    const companies: Company[] = await this.companiesService.findAllSuppliers();
    return plainToClass(CompanyDTO,companies);
  }
  
  @Get('suppliers-light')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: LightCompanyDTO,
    isArray: true
  })
  async findAllSuppliersLight(): Promise<LightCompanyDTO[]> {
    const companies: Company[] = await this.companiesService.findAllSuppliers();
    return plainToClass(LightCompanyDTO,companies);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CompanyDTO
  })
  async findOne(@Param('id') id: number): Promise<CompanyDTO> {
    const company: Company = await this.companiesService.findOneById(id);
    return plainToClass(CompanyDTO,company);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleCompanyDTO,
  })
  async create(@Body() dto: CreateCompanyDTO): Promise<SimpleCompanyDTO>  {
    dto = new CreateCompanyDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const existingCompany: Company = await this.companiesService.findOneByEmailOrVAT(dto.email, dto.VAT);
    if (existingCompany) throw new ConflictException; //TODO better exception (add info)

    if (typeof dto.personId === 'string' || dto.personId === undefined) throw new BadRequestException;
    if (dto.personId) {  
      const person: Person = await this.personsService.findOneById(dto.personId);
      if (!person) throw new NotFoundException;
      dto.person = person;
      delete dto.personId;
    } else {
      const person: Person = await this.personsService.findOneById(existingCompany.person?.id);
      if (person) {
        dto.person = null;
      }
      delete dto.personId;
    }
    
    const newCompany: Company = await this.companiesService.create(dto);
    return plainToClass(SimpleCompanyDTO,newCompany);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleCompanyDTO,
  })
  async update(@Param('id') id: number, @Body() dto: UpdateCompanyDTO): Promise<SimpleCompanyDTO>  {
    dto = new UpdateCompanyDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const existingCompany: Company = await this.companiesService.findOneByEmailOrVAT(dto.email, dto.VAT);
    if (!existingCompany) throw new NotFoundException;
    const emailConflict = await this.companiesService.findOtherByEmail(id, dto.email);
    if (emailConflict) throw new ConflictException; //TODO better exception (add info)
    const VATConflict = await this.companiesService.findOtherByVAT(id, dto.VAT);
    if (VATConflict) throw new ConflictException; //TODO better exception (add info)

    if (existingCompany.address && dto.address) {
      //update address
      const addr: Address = await this.addressService.findOneById(existingCompany.address.id);
      for (const [prop, val] of Object.entries(dto.address)){
        addr[prop] = val;
      }
      await this.addressService.update(addr.id, addr);
      dto.address.id = addr.id;
    } else if (!existingCompany.address && dto.address) {
      //create address
      const addrId = await this.addressService.create(dto.address);
      dto.address = addrId;
    } else if (existingCompany.address && !dto.address) {
      // remove address
      const addr: Address = await this.addressService.findOneById(existingCompany.address.id);
      this.addressService.remove(addr.id);
    }
    
    if (typeof dto.personId === 'string' || dto.personId === undefined) throw new BadRequestException;
    if (dto.personId) {  
      const person: Person = await this.personsService.findOneById(dto.personId);
      if (!person) throw new NotFoundException;
      dto.person = person;
      delete dto.personId;
    } else {
      const person: Person = await this.personsService.findOneById(existingCompany.person?.id);
      if (person) {
        dto.person = null;
      }
      delete dto.personId;
    }
    const updatedCompany: Company = await this.companiesService.update(id, dto);
    updatedCompany.id = id;
    
    return plainToClass(SimpleCompanyDTO,updatedCompany);
  }
  
  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const company: Company | undefined = await this.companiesService.findOneById(id);
    if (company == undefined) throw new NotFoundException;
    this.companiesService.remove(id);
    if (company.address) await this.addressService.remove(company.address.id);
    return [];
  }
}
