import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioLoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: PortfolioLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioLoggerService],
    }).compile();

    service = module.get<PortfolioLoggerService>(PortfolioLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
