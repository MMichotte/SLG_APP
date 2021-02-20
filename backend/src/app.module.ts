import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './models/cars/cars.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
