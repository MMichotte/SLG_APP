import { join } from 'path';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendApplication(@Res() res) {
    res.sendFile(join(__dirname, '../public/dist/index.html'));
  }
  
}
