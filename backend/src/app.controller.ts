import { join } from 'path';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @ApiExcludeEndpoint()
  sendApplication(@Res() res) {
    res.sendFile(join(__dirname, '../public/dist/index.html'));
  }
  
}
