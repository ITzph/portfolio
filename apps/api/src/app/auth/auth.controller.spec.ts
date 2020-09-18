import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PortfolioLoggerService } from '../logger/logger.service';
import { ProfileService } from '../profile/profile.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PortfolioLoggerService,
        JwtService,
        ProfileService,
        {
          provide: 'JWT_MODULE_OPTIONS',
          useValue: {},
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
