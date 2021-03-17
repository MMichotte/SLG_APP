import { AddressesModule } from '../adresses/addresses.module';
import { Person } from './entities/person.entity';
import { Module } from '@nestjs/common';
import { PersonsService } from './services/persons.service';
import { PersonsController } from './controllers/persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    AddressesModule
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
