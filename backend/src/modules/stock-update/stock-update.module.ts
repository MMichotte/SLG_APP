import { StockUpdate } from './entities/stock-update.entity';
import { forwardRef, Module } from '@nestjs/common';
import { StockUpdateService } from './services/stock-update.service';
import { StockUpdateController } from './controllers/stock-update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockUpdate]),
    forwardRef(() => ProductsModule)
  ],
  controllers: [StockUpdateController],
  providers: [
    StockUpdateService
  ], 
  exports: [ StockUpdateService ]
})
export class StockUpdateModule {}
