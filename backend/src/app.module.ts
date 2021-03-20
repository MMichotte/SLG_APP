import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { WorkforcesModule } from './modules/workforces/workforces.module';
import { StockUpdateModule } from './modules/stock-update/stock-update.module';
import { AddressesModule } from './modules/adresses/addresses.module';
import { PersonsModule } from './modules/persons/persons.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { OrdersModule } from './modules/orders/orders/orders.module';
import { ProductOrderModule } from './modules/orders/product-order/product-order.module';
import { BillSupplierModule } from './modules/bills/bill-supplier/bill-supplier.module';
import dbConnectionOptions from 'ormconfig';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionOptions),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    WorkforcesModule,
    StockUpdateModule,
    AddressesModule,
    PersonsModule,
    CompaniesModule,
    OrdersModule,
    ProductOrderModule,
    BillSupplierModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
