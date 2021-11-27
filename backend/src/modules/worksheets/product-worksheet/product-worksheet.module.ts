import { ProductsModule } from '@modules/products/products.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksheetsModule } from '../worksheets/worksheets.module';
import { ProductWorksheetsController } from './controllers/product-worksheets.controller';
import { ProductWorksheet } from './entities/product-worksheet.entity';
import { ProductWorksheetsService } from './services/product-worksheets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductWorksheet]),
    WorksheetsModule,
    ProductsModule
  ],
  controllers: [ProductWorksheetsController],
  providers: [ProductWorksheetsService],
  exports: [ProductWorksheetsService]
})
export class ProductWorksheetModule {}
