import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('authenticate')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
}
