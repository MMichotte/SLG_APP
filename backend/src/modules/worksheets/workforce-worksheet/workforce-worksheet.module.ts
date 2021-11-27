import { WorkforcesModule } from '@modules/workforces/workforces.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksheetsModule } from '../worksheets/worksheets.module';
import { WorkforceWorksheetsController } from './controllers/workforce-worksheets.controller';
import { WorkforceWorksheet } from './entities/workforce-worksheet.entity';
import { WorkforceWorksheetsService } from './services/workforce-worksheets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkforceWorksheet]),
    WorksheetsModule,
    WorkforcesModule
  ],
  controllers: [WorkforceWorksheetsController],
  providers: [WorkforceWorksheetsService]
})
export class WorkforceWorksheetModule {}
