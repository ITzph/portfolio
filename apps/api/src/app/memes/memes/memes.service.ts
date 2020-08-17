import { Injectable } from '@nestjs/common';
import { ImageMetadata } from '../../database/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemesService {
  constructor(
    @InjectRepository(ImageMetadata) private readonly imageRepository: Repository<ImageMetadata>,
  ) {}

  public fetchAllMemes() {
    return this.imageRepository.find();
  }

  public saveImageMetadata(image: ImageMetadata) {
    return this.imageRepository.save(image);
  }

  public deleteImage(id: number) {
    return this.imageRepository.delete(id);
  }

  public getImageById(id: number) {
    return this.imageRepository.findOne(id);
  }
}
