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
    return 'allasdfasdfasdfdsa';
  }

  public saveImageMetadata(image: ImageMetadata) {
    return this.imageRepository.save(image);
  }
}
