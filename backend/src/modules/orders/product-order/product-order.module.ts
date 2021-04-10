import { OrdersModule } from './../orders/orders.module';
import { ProductOrder } from './entities/product-order.entity';
import { forwardRef, Module } from '@nestjs/common';
import { ProductOrderService } from './services/product-order.service';
import { ProductOrderController } from './controllers/product-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrder]),
    forwardRef(() => OrdersModule),
    ProductsModule
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
