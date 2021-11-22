import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { CarModel } from '@modules/cars/car-models/entities/car-model.entity';
import { CarModelsService } from '@modules/cars/car-models/services/car-models.service';
import { Person } from '@modules/persons/entities/person.entity';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { Controller, UseGuards, Get, Post, Body, HttpException, HttpStatus, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CarDTO } from '../dto/car.dto';
import { CreateCarDTO } from '../dto/create-car.dto';
import { SimpleCarDTO } from '../dto/simple-car.dto';
import { UpdateCarDTO } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity';
import { CarsService } from '../services/cars.service';
import { CompaniesService } from '@modules/companies/services/companies.service';
import { PersonsService } from '@modules/persons/services/persons.service';
import { Company } from '@modules/companies/entities/company.entity';

@Controller('cars')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('cars')
@ApiBearerAuth()
export class CarsController {
  constructor( 
    private readonly carsService: CarsService,
    private readonly carModelsService: CarModelsService,
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarDTO,
    isArray: true
  })
  async findAll(): Promise<CarDTO[]>{
    const car: Car[] = await this.carsService.findAll();
    return plainToClass(CarDTO, car);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarDTO,
  })
  async findOne(@Param('id') id: number): Promise<CarDTO>{
    const car: Car = await this.carsService.findOneById(+id);
    return plainToClass(CarDTO, car);
  }

  @Get('person/:personId')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarDTO,
    isArray: true
  })
  async findAllByPersonId(@Param('personId') personId: number): Promise<CarDTO[]>{
    const car: Car[] = await this.carsService.findAllByOwnerId(+personId, 'p');
    return plainToClass(CarDTO, car);
  }
  
  @Get('company/:companyId')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarDTO,
    isArray: true
  })
  async findAllByCompanyId(@Param('companyId') companyId: number): Promise<CarDTO[]>{
    const car: Car[] = await this.carsService.findAllByOwnerId(+companyId, 'c');
    return plainToClass(CarDTO, car);
  }


  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleCarDTO,
  })
  async create(@Body() car: CreateCarDTO): Promise<SimpleCarDTO> {
    //check if model already exists for given make.
    const existingCar: Car = await this.carsService.findOneByChassisNumber(car.chassisNumber);
    if (existingCar) throw new HttpException('Chassis n° already exists', HttpStatus.BAD_REQUEST);

    const carModel: CarModel = await this.carModelsService.findOneById(car.modelId);
    if (!carModel) throw new NotFoundException;
    car.model = carModel;
    delete car.modelId;

    if (car.personId) {
      const person: Person = await this.personsService.findOneById(car.personId);
      if (!person) throw new NotFoundException;
      car.person = person;
    }
    delete car.personId;
    
    if (car.companyId) {
      const company: Company = await this.companiesService.findOneById(car.companyId);
      if (!company) throw new NotFoundException;
      car.company = company;
    }
    delete car.companyId;

    const createdCar = await this.carsService.create(car);
    return plainToClass(SimpleCarDTO, createdCar);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleCarDTO,
  })
  async update(@Param('id') id: number, @Body() car: UpdateCarDTO): Promise<SimpleCarDTO> {
    const existingCar: Car = await this.carsService.findOneById(+id);
    console.log(existingCar);
    if (!existingCar) throw new HttpException('Car does not exist', HttpStatus.NOT_FOUND);
    
    const existingChassis: Car = await this.carsService.findOneByChassisNumber(car.chassisNumber);
    if (existingChassis) {
      if (existingChassis.id !== existingCar.id) throw new HttpException('Chassis n° is already taken', HttpStatus.BAD_REQUEST);
    }

    const carModel: CarModel = await this.carModelsService.findOneById(car.modelId);
    if (!carModel) throw new HttpException('Car model does not exist', HttpStatus.NOT_FOUND);
    car.model = carModel;
    delete car.modelId;

    if (car.personId) {
      const person: Person = await this.personsService.findOneById(car.personId);
      if (!person) throw new HttpException('Owner does not exist', HttpStatus.NOT_FOUND);
      car.person = person;
    } else {
      car.person= null;
    }
    delete car.personId;
    
    if (car.companyId) {
      const company: Company = await this.companiesService.findOneById(car.companyId);
      if (!company) throw new HttpException('Owner does not exist', HttpStatus.NOT_FOUND);
      car.company = company;
    } else {
      car.company = null;
    }
    delete car.companyId;
    
    
    const updatedCar = await this.carsService.update(id, car);
    updatedCar.id = id;
    return plainToClass(SimpleCarDTO, updatedCar);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const car: Car | undefined = await this.carsService.findOneById(+id);
    if (car == undefined) throw new NotFoundException;
    await this.carsService.remove(+id);
    return [];
  }

}
