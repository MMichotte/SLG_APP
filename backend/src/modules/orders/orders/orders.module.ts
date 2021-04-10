import { ProductsModule } from '@modules/products/products.module';
import { CompaniesModule } from '@modules/companies/companies.module';
import { ProductOrderModule } from './../product-order/product-order.module';
import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => ProductOrderModule),
    CompaniesModule,
    ProductsModule
  ],
  controllers: [
    OrdersController,
  ],
  providers: [
    OrdersService,
  ],
  exports: [OrdersService]
})
export class OrdersModule {}
