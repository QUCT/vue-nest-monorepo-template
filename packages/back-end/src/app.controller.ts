import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonInterface, commonFunction } from 'shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): any {
    const data = commonFunction() + 4;
    return data;
  }
}
