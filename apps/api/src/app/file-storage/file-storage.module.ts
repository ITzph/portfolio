import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMetadata } from '../database/entities/file.entity';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';
import { FilesS3Service } from './files-s3.service';

@Module({
  controllers: [FileStorageController],
  providers: [FileStorageService, FilesS3Service],
  imports: [
    TypeOrmModule.forFeature([FileMetadata]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: FilesS3Service,
    }),
    ConfigModule,
  ],
})
export class FileStorageModule {}
