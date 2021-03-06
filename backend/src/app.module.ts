import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { WorkforcesModule } from './modules/workforces/workforces.module';
import dbConnectionOptions from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionOptions),
    AuthModule,
    UsersModule,
    ProductsModule,
    WorkforcesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
