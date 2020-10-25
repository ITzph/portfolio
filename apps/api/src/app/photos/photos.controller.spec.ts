import { Test, TestingModule } from '@nestjs/testing';
import { PhotosController } from './photos.controller';
import { PhotosModule } from '../photos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMetadata } from '../../database/entities/image.entity';
import { PhotosS3Service } from './photos-s3.service';
import { PortfolioLoggerService } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { PhotosService } from './photos.service';
import { Repository } from 'typeorm';

describe('Photos Controller', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [
        PhotosService,
        PhotosS3Service,
        PortfolioLoggerService,
        ConfigService,
        {
          provide: 'ImageMetadataRepository',
          useClass: Repository,
        },
      ],
    }).compile();
    //

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
