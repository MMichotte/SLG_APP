import { RedisService } from '@core/services/redis.service';
import { Module } from '@nestjs/common';
import { AddressesService } from './services/addresses.service';
import { AddressesController } from './controllers/addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address])
  ],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    RedisService
  ],
  exports: [AddressesService]
})
export class AddressesModule {}
