import { AddressesModule } from './../adresses/addresses.module';
import { Client } from './entities/client.entity';
import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    AddressesModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
