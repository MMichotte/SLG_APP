import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { CarMake } from '@modules/cars/car-makes/entities/car-make.entity';
import { CarMakesService } from '@modules/cars/car-makes/services/car-makes.service';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { Controller, UseGuards, Get, Post, Body, HttpException, HttpStatus, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CarModelDTO } from '../dto/car-model.dto';
import { CreateCarModelDTO } from '../dto/create-car-model.dto';
import { SimpleCarModelDTO } from '../dto/simple-car-model.dto';
import { UpdateCarModelDTO } from '../dto/update-car-model.dto';
import { CarModel } from '../entities/car-model.entity';
import { CarModelsService } from '../services/car-models.service';

@Controller('car-models')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('car-models')
@ApiBearerAuth()
export class CarModelsController {
  constructor( 
    private readonly carModelsService: CarModelsService,
    private readonly carMakesService: CarMakesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarModelDTO,
    isArray: true
  })
  async findAll(): Promise<CarModelDTO[]>{
    const carModels: CarModel[] = await this.carModelsService.findAll();
    return plainToClass(CarModelDTO, carModels);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleCarModelDTO,
  })
  async create(@Body() carModel: CreateCarModelDTO): Promise<SimpleCarModelDTO> {
    //check if model already exists for given make.
    const existingModel: CarModel = await this.carModelsService.findOneByLabelByMake(carModel.label, carModel.carMakeId);
    if (existingModel) throw new HttpException('Model already exists', HttpStatus.UNAUTHORIZED);

    const carMake: CarMake = await this.carMakesService.findOneById(carModel.carMakeId);
    if (!carMake) throw new NotFoundException;
    carModel.carMake = carMake;
    delete carModel.carMakeId;

    const createdCarModel = await this.carModelsService.create(carModel);
    return plainToClass(SimpleCarModelDTO, createdCarModel);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleCarModelDTO,
  })
  async update(@Param('id') id: number, @Body() carModel: UpdateCarModelDTO): Promise<SimpleCarModelDTO> {
    const updatedCarModel = await this.carModelsService.update(id, carModel);
    updatedCarModel.id = id;
    return plainToClass(SimpleCarModelDTO, updatedCarModel);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const carModel: CarModel | undefined = await this.carModelsService.findOneById(id);
    if (carModel == undefined) throw new NotFoundException;
    await this.carModelsService.remove(+id);
    return [];
  }

}
