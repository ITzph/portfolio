import { Module } from '@nestjs/common';
import { PortfolioLoggerService } from './logger.service';

@Module({
  providers: [PortfolioLoggerService],
  exports: [PortfolioLoggerService],
})
export class LoggerModule {}
