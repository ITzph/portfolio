import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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
    //

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
