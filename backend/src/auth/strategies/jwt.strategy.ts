import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../models/users/users.service';
import env from '../../config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_PRIVATE_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
