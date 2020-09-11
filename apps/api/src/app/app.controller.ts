import { Controller, Get } from '@nestjs/common';

import { Message } from '@portfolio/api-interfaces';

import { AppService } from './app.service';
import { PortfolioLoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PortfolioLoggerService,
  ) {
    this.logger.setContext('AppController');
  }

  @Get('')
  getData(): Message {
    this.logger.log('Accessing api test endpoint');
    return this.appService.getData();
  }
}
