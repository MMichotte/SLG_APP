import { CompaniesModule } from '@modules/companies/companies.module';
import { PersonsModule } from '@modules/persons/persons.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelsModule } from '../car-models/car-models.module';
import { CarsController } from './controllers/cars.controller';
import { Car } from './entities/car.entity';
import { CarsService } from './services/cars.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    CarModelsModule,
    PersonsModule,
    CompaniesModule
  ],
  controllers: [CarsController],
  providers: [
    CarsService
  ],
  exports: [CarsService],
})
export class CarsModule {
  
}
