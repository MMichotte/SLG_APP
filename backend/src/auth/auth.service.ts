import { BcryptService } from '../common/helpers/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { User } from '../models/users/entities/user.entity';
import { UsersService } from '../models/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtTokenService } from 'src/common/helpers/jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtTokenService,
  ) {}

  async validateUser(userCredentials: LoginDTO) {
    const user = await this.userService.findOneByEmail(userCredentials.email);
    if (!user) {
      return null;
    }

    const match = await this.bcryptService.comparePassword(
      userCredentials.password,
      user.password,
    );
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: User) {
    const token: string = await this.jwtService.generateToken(user);
    return token;
  }

}
