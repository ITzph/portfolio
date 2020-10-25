import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMetadata } from '../database/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PhotosS3Service } from './photos-s3.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, PhotosS3Service],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([ImageMetadata]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: PhotosS3Service,
    }),
    ConfigModule,
  ],
  exports: [TypeOrmModule, PhotosService, PhotosS3Service],
})
export class PhotosModule {}
