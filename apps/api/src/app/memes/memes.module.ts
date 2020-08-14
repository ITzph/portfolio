import { Module } from '@nestjs/common';
import { MemesController } from './memes/memes.controller';
import { MemesService } from './memes/memes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMetadata } from '../database/entities/image.entity';

@Module({
  controllers: [MemesController],
  providers: [MemesService],
  imports: [TypeOrmModule.forFeature([ImageMetadata])],
})
export class MemesModule {}
