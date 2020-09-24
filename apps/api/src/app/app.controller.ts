import { Controller, Get } from '@nestjs/common';

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
  getData() {
    this.logger.log('Accessing api test endpoint');
    return this.appService.getData();
  }
}
