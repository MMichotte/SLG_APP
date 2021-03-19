import { ProductsModule } from './../../products/products.module';
import { CompaniesModule } from './../../companies/companies.module';
import { ProductOrderModule } from './../product-order/product-order.module';
import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderProductOrderController } from './controllers/order-product-order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductOrderModule,
    CompaniesModule,
    ProductsModule
  ],
  controllers: [
    OrdersController,
    OrderProductOrderController
  ],
  providers: [
    OrdersService,
  ]
})
export class OrdersModule {}
