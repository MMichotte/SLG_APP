import { PersonsModule } from './../persons/persons.module';
import { Company } from './entities/company.entity';
import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies.service';
import { CompaniesController } from './controllers/companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from '../adresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    AddressesModule,
    PersonsModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
