import { Test, TestingModule } from '@nestjs/testing';
import { MemesController } from './memes.controller';
import { MemesModule } from '../memes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMetadata } from '../../database/entities/image.entity';
import { MemesS3Service } from './memes-s3.service';
import { PortfolioLoggerService } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { MemesService } from './memes.service';
import { Repository } from 'typeorm';

describe('Memes Controller', () => {
  let controller: MemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemesController],
      providers: [
        MemesService,
        MemesS3Service,
        PortfolioLoggerService,
        ConfigService,
        {
          provide: 'ImageMetadataRepository',
          useClass: Repository,
        },
      ],
    }).compile();
    //

    controller = module.get<MemesController>(MemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
