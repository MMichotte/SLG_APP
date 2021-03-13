import { Module } from '@nestjs/common';
import { AdressesService } from './services/adresses.service';
import { AdressesController } from './controllers/adresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address])
  ],
  controllers: [AdressesController],
  providers: [AdressesService]
})
export class AdressesModule {}
