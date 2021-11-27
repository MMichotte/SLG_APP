import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '@core/decorators/roles.decorator';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { validate } from 'class-validator';
import { WorksheetsService } from '../services/worksheets.service';
import { WorksheetDTO } from '../dto/worksheet.dto';
import { Worksheet } from '../entities/worksheet.entity';
import { SimpleWorksheetDTO } from '../dto/simple-worksheet.dto';
import { CreateWorksheetDTO } from '../dto/create-worksheet.dto';
import { UpdateWorksheetDTO } from '../dto/update-worksheet.dto';
import { Car } from '@modules/cars/cars/entities/car.entity';
import { CarsService } from '@modules/cars/cars/services/cars.service';
import { Company } from '@modules/companies/entities/company.entity';
import { CompaniesService } from '@modules/companies/services/companies.service';
import { Person } from '@modules/persons/entities/person.entity';
import { PersonsService } from '@modules/persons/services/persons.service';

@Controller('worksheets')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('worksheets')
@ApiBearerAuth()
export class WorksheetsController {
  constructor(
    private readonly worksheetsService: WorksheetsService,
    private readonly carsService: CarsService,
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService
  ) { }

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorksheetDTO,
    isArray: true
  })
  async findAll(): Promise<WorksheetDTO[]> {
    const worksheets: Worksheet[] = await this.worksheetsService.findAll();
    return plainToClass(WorksheetDTO, worksheets);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: WorksheetDTO,
  })
  async findOne(@Param('id') id: number): Promise<WorksheetDTO> {
    const worksheet: Worksheet = await this.worksheetsService.findOneById(id);
    return plainToClass(WorksheetDTO, worksheet);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleWorksheetDTO,
  })
  async create(@Body() createWorksheetDto: CreateWorksheetDTO): Promise<SimpleWorksheetDTO> {
    createWorksheetDto = new CreateWorksheetDTO(createWorksheetDto);
    const errors = await validate(createWorksheetDto);
    if (errors.length) throw new BadRequestException;

    if (createWorksheetDto.carId && !createWorksheetDto.personId && !createWorksheetDto.companyId) {
      const car: Car = await this.carsService.findOneById(createWorksheetDto.carId);
      if (!car) throw new HttpException(`There is no car with id: ${createWorksheetDto.carId}`, HttpStatus.BAD_REQUEST);
      createWorksheetDto.car = car;
      delete createWorksheetDto.carId;

    } else if (!createWorksheetDto.carId && createWorksheetDto.personId && !createWorksheetDto.companyId) {
      const person: Person = await this.personsService.findOneById(createWorksheetDto.personId);
      if (!person) throw new HttpException(`There is no person with id: ${createWorksheetDto.personId}`, HttpStatus.BAD_REQUEST);
      createWorksheetDto.person = person;
      delete createWorksheetDto.personId;

    } else if (!createWorksheetDto.carId && !createWorksheetDto.personId && createWorksheetDto.companyId) {
      const company: Company = await this.companiesService.findOneById(createWorksheetDto.companyId);
      if (!company) throw new HttpException(`There is no company with id: ${createWorksheetDto.companyId}`, HttpStatus.BAD_REQUEST);
      createWorksheetDto.company = company;
      delete createWorksheetDto.companyId;

    } else {
      throw new HttpException(
        'A worksheet can only apply to ONE and ONLY ONE of the following objects: car, person, company.',
        HttpStatus.BAD_REQUEST
      );
    }


    const createdWorksheet: Worksheet = await this.worksheetsService.create(createWorksheetDto);
    return plainToClass(SimpleWorksheetDTO, createdWorksheet);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleWorksheetDTO,
  })
  async update(@Param('id') id: number, @Body() updateWorksheetDTO: UpdateWorksheetDTO): Promise<SimpleWorksheetDTO> {
    updateWorksheetDTO = new UpdateWorksheetDTO(updateWorksheetDTO);
    const errors = await validate(updateWorksheetDTO);
    if (errors.length) throw new BadRequestException;

    const worksheet: Worksheet | undefined = await this.worksheetsService.findOneById(id);
    if (worksheet == undefined) throw new NotFoundException;
    updateWorksheetDTO.updatedAt = new Date();
    const updatedWorksheet: Worksheet = await this.worksheetsService.update(id, updateWorksheetDTO);
    updatedWorksheet.id = id;
    return plainToClass(SimpleWorksheetDTO, updatedWorksheet);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const worksheet: Worksheet | undefined = await this.worksheetsService.findOneById(id);
    if (worksheet == undefined) throw new NotFoundException;
    await this.worksheetsService.remove(+id);
    return [];
  }
}
