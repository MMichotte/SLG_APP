import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return token;
  }
  
}
