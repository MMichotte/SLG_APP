import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../models/users/entities/user.entity';
import { UsersService } from '../models/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
    ) { }

  async validateUser(userCredentials: LoginDTO) {

    const user = await this.userService.findOneByEmail(userCredentials.email);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(userCredentials.password, user.password);
    if (!match) {
        return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  
  }

  public async login(user: User) {
    const token: string = await this.generateToken(user);
    return token;
  }

  private async generateToken(user: User) {
    const token = await this.jwtService.signAsync({id: user.id, email: user.email, role: user.role});
    return token;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match; 
  }

}
