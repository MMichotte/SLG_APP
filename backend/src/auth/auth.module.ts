import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import env from '../config/env';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
  }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
