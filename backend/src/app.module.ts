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
import dbConnectionOptions from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionOptions),
    AuthModule,
    UsersModule,
    ProductsModule,
    WorkforcesModule,
    StockUpdateModule,
    AddressesModule,
    PersonsModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
