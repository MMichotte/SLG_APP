import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../../../core/helpers/bcrypt.service';
import { JwtTokenService } from '../../../core/helpers/jwt-token.service';
import { AuthService } from './auth.service';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import env from '../../../config/env';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
          secret: env.JWT_PRIVATE_KEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
      ],
      providers: [
        AuthService,
        BcryptService,
        JwtTokenService,
        LocalStrategy,
        JwtStrategy
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
