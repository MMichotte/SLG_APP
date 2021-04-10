import { LoginDTO } from '../dto/login.dto';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('authenticate')
@Controller('login')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Retrieve a JWT token by logging in a user.' })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
