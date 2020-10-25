import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { MemesService } from './memes.service';

describe('MemesService', () => {
  let service: MemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemesService,
        {
          provide: 'ImageMetadataRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MemesService>(MemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
