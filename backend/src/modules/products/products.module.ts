import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from '@core/services/redis.service';
import { Product } from './entities/product.entity';
import { ProductsStockUpdateController } from './controllers/products-stock-update';
import { StockUpdateModule } from '../stock-update/stock-update.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => StockUpdateModule) 
  ],
  controllers: [
    ProductsController,
    ProductsStockUpdateController
  ],
  providers: [
    ProductsService,
    RedisService
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
