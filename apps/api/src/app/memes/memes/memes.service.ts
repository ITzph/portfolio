import { Injectable } from '@nestjs/common';
import { ImageMetadata } from '../../database/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IImageMetadata, Pagination, IPaginationOptions } from '@portfolio/api-interfaces';

@Injectable()
export class MemesService {
  constructor(
    @InjectRepository(ImageMetadata) private readonly imageRepository: Repository<ImageMetadata>,
  ) {}

  public async fetchAllMemes(options: IPaginationOptions): Promise<Pagination<IImageMetadata>> {
    const [memes, totalItems] = await this.imageRepository.findAndCount({
      take: options.limit,
      skip: options.page,
    });

    return {
      // Remove URL when sending response
      items: memes.map((meme) => {
        delete meme.url;
        return meme;
      }),
      meta: {
        currentPage: options.page,
        itemCount: memes.length,
        totalItems,
        itemsPerPage: options.limit,
        totalPages: totalItems / options.limit,
      },
      links: {},
    };
  }

  public saveImageMetadata(image: ImageMetadata) {
    return this.imageRepository.save(image);
  }

  public patchImage(id: number, image: Partial<{ title: string; description: string }>) {
    return this.imageRepository.save({
      id,
      ...image,
    });
  }

  public deleteImage(id: number) {
    return this.imageRepository.delete(id);
  }

  public getImageById(id: number) {
    return this.imageRepository.findOne(id);
  }
}
