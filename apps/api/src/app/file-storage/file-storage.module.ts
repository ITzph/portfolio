import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMetadata } from '../database/entities/file.entity';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';

@Module({
  controllers: [FileStorageController],
  imports: [TypeOrmModule.forFeature([FileMetadata])],
  providers: [FileStorageService],
})
export class FileStorageModule {}
