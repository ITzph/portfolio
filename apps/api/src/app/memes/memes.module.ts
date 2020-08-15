import { Module } from '@nestjs/common';
import { MemesController } from './memes/memes.controller';
import { MemesService } from './memes/memes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMetadata } from '../database/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MemesS3Service } from './memes/memes-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MemesController],
  providers: [MemesService, MemesS3Service],
  imports: [
    TypeOrmModule.forFeature([ImageMetadata]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MemesS3Service,
    }),
    ConfigModule,
  ],
})
export class MemesModule {}
