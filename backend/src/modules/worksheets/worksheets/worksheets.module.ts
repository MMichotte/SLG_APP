import { CarsModule } from '@modules/cars/cars/cars.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { PersonsModule } from '@modules/persons/persons.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksheetsController } from './controllers/worksheets.controller';
import { Worksheet } from './entities/worksheet.entity';
import { WorksheetsService } from './services/worksheets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Worksheet]),
    CarsModule,
    PersonsModule,
    CompaniesModule
  ],
  controllers: [WorksheetsController],
  providers: [WorksheetsService],
  exports: [WorksheetsService]
})
export class WorksheetsModule {}
