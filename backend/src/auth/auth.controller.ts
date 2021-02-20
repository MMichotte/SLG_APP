import { LoginDTO } from './dto/login.dto';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('authenticate')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginDTO })
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
