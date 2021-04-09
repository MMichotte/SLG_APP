import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from '../../core/services/bcrypt.service';
import { JwtTokenService } from '../../core/services/jwt-token.service';
import env from '../../config/env';

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
    BcryptService,
    JwtTokenService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
