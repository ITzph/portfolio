import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMetadata } from '../database/entities/file.entity';

@Injectable()
export class FileStorageService {
  constructor(
    @InjectRepository(FileMetadata) private readonly fileRepository: Repository<FileMetadata>,
  ) {}

  public getAllFiles() {
    return this.fileRepository.find({
      select: ['fileName', 'category', 'description', 'id', 'key', 'tags'],
    });
  }

  public getOneFile(id: number) {
    return this.fileRepository.findOne(id);
  }

  public addNewFile(file: FileMetadata) {
    return this.fileRepository.save(file);
  }

  public deleteById(id: number) {
    return this.fileRepository.delete(id);
  }

  public patchFile(id: number, file: Partial<FileMetadata>) {
    return this.fileRepository.save({
      id,
      ...file,
    });
  }
}
