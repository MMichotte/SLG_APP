import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { Controller, UseGuards, Get, Post, Body, HttpException, HttpStatus, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateCarMakeDTO } from '../dto/create-car-make.dto';
import { SimpleCarMakeDTO } from '../dto/simple-car-make.dto';
import { UpdateCarMakeDTO } from '../dto/update-car-make.dto';
import { CarMake } from '../entities/car-make.entity';
import { CarMakesService } from '../services/car-makes.service';

@Controller('car-makes')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('car-makes')
@ApiBearerAuth()
export class CarMakesController {
  constructor( private readonly carMakesService: CarMakesService ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: CarMake,
    isArray: true
  })
  async findAll(): Promise<CarMake[]>{
    const carMakes: CarMake[] = await this.carMakesService.findAll();
    return plainToClass(CarMake, carMakes);
  }

  @Post()
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 201,
    type: SimpleCarMakeDTO,
  })
  async create(@Body() carMake: CreateCarMakeDTO): Promise<SimpleCarMakeDTO> {
    //check if make already exists.
    const existingMake: CarMake = await this.carMakesService.findOneByLabel(carMake.label);
    if (existingMake) throw new HttpException('Make already exists', HttpStatus.UNAUTHORIZED);
    const createdCarMake = await this.carMakesService.create(carMake);
    return plainToClass(SimpleCarMakeDTO, createdCarMake);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN)
  @ApiResponse({
    status: 200,
    type: SimpleCarMakeDTO,
  })
  async update(@Param('id') id: number, @Body() carMake: UpdateCarMakeDTO): Promise<SimpleCarMakeDTO> {
    const updatedCarMake = await this.carMakesService.update(id, carMake);
    updatedCarMake.id = id;
    return plainToClass(SimpleCarMakeDTO, updatedCarMake);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const carMake: CarMake | undefined = await this.carMakesService.findOneById(id);
    if (carMake == undefined) throw new NotFoundException;
    await this.carMakesService.remove(+id);
    return [];
  }

}
