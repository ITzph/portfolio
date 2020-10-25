import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Delete,
  Param,
  ParseIntPipe,
  Req,
  HttpStatus,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

import { PhotosS3Service } from './photos-s3.service';
import { ImageCategory } from '../database/entities/image.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioLoggerService } from '../logger/logger.service';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly s3Service: PhotosS3Service,
    private readonly logger: PortfolioLoggerService,
  ) {}

  @Get()
  async fetchAllImages(
    @Query('orderBy') orderBy: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    let orderQuery: {
      key: keyof IImageMetadata;
      order: 'ASC' | 'DESC';
    };

    if (orderBy) {
      // TODO remove as any
      const [key, order] = orderBy.split('.') as any;

      orderQuery = {
        key,
        order,
      };
    }

    const paginatednata = await this.photosService.fetchAllPhotos(
      {
        limit,
        page,
      },
      orderQuery,
    );

    return paginatednata;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchImage(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log('PATCH photos/:id');
    try {
      const body = req.body as Partial<{ title: string; description: string }>;

      const result = await this.photosService.patchImage(id, body);

      res.status(HttpStatus.ACCEPTED).send(result);
    } catch (error) {
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send('Operation not allowed');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    this.logger.log('DELETE photos/:id');
    const imageToDelete = await this.photosService.getImageById(id);

    if (imageToDelete) {
      await this.s3Service
        .s3Instance()
        .deleteObject({
          Bucket: process.env.AWS_MEMES_BUCKET_NAME,
          Key: imageToDelete.imageName,
        })
        .promise();

      const result = await this.photosService.deleteImage(id);

      if (result.affected) {
        return res.send({ id });
      }
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Gago ka ba!' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Req() req: Request, @Res() res: Response) {
    this.logger.log('POST photos');
    const body = req.body as { caption: string; title: string; tags: string };

    try {
      const image = await this.photosService.saveImageMetadata({
        id: null,
        description: body?.caption,
        category: ImageCategory.MEME,
        title: body?.title,
        url: file.location,
        imageName: file.key,
        user: null,
        tags: JSON.parse(body?.tags ?? '[]') || [],
        createdAt: new Date(),
      });
      res.send(image);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('image/:key')
  async getImageByKey(@Param('key') key: string, @Res() res: Response) {
    this.logger.log('GET photos/:key');
    try {
      const s3GetRes = await this.s3Service
        .s3Instance()
        .getObject({ Bucket: process.env.AWS_MEMES_BUCKET_NAME, Key: key })
        .promise();

      res.status(HttpStatus.OK).set('Content-Type', 'image/*').send(s3GetRes.Body);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }
}
