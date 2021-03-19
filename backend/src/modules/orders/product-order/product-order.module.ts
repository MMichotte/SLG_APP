import { ProductOrder } from './entities/product-order.entity';
import { Module } from '@nestjs/common';
import { ProductOrderService } from './services/product-order.service';
import { ProductOrderController } from './controllers/product-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrder])
  ],
  controllers: [
    ProductOrderController
  ],
  providers: [
    ProductOrderService
  ],
  exports: [
    ProductOrderService
  ]
})
export class ProductOrderModule {}
