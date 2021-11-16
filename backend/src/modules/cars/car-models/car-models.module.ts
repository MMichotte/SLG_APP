import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMakesModule } from '../car-makes/car-makes.module';
import { CarModelsController } from './controllers/car-models.controller';
import { CarModel } from './entities/car-model.entity';
import { CarModelsService } from './services/car-models.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarModel]),
    CarMakesModule
  ],
  controllers: [CarModelsController],
  providers: [
    CarModelsService
  ],
  exports: [CarModelsService],
})
export class CarModelsModule {}
