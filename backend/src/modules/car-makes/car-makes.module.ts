import { CarMakesService } from './services/car-makes.service';
import { CarMakesController } from './controllers/car-makes.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarMake])],
  controllers: [CarMakesController],
  providers: [
    CarMakesService
  ],
  exports: [CarMakesService],
})
export class CarMakesModule {}
