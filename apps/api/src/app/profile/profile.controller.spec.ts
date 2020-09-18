import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PortfolioLoggerService } from '../logger/logger.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('Profile Controller', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        PortfolioLoggerService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
