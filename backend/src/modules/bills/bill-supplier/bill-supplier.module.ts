import { ProductsModule } from './../../products/products.module';
import { OrdersModule } from './../../orders/orders/orders.module';
import { ProductOrderModule } from './../../orders/product-order/product-order.module';
import { Module } from '@nestjs/common';
import { BillSupplierService } from './services/bill-supplier.service';
import { BillSupplierController } from './controllers/bill-supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillSupplier } from './entities/bill-supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillSupplier]),
    ProductsModule,
    ProductOrderModule,
    OrdersModule
  ],
  controllers: [BillSupplierController],
  providers: [BillSupplierService]
})
export class BillSupplierModule {}
