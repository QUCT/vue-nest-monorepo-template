import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonInterface, commonFunction } from 'shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
