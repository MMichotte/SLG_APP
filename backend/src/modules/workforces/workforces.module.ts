import { Workforce } from './entities/workforce.entity';
import { Module } from '@nestjs/common';
import { WorkforcesService } from './services/workforces.service';
import { WorkforcesController } from './controllers/workforces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Workforce])],
  controllers: [WorkforcesController],
  providers: [WorkforcesService],
  exports: [WorkforcesService]
})
export class WorkforcesModule {}
