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
import { MemesService } from './memes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

import { MemesS3Service } from './memes-s3.service';
import { ImageCategory } from '../../database/entities/image.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PortfolioLoggerService } from '../../logger/logger.service';

@Controller('memes')
export class MemesController {
  constructor(
    private readonly memesService: MemesService,
    private readonly s3Service: MemesS3Service,
    private readonly logger: PortfolioLoggerService,
  ) {}

  @Get()
  async fetchAllImages(@Query('page') page: number, @Query('limit') limit: number) {
    const paginatednata = await this.memesService.fetchAllMemes({
      limit,
      page,
    });

    return paginatednata;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchImage(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log('PATCH memes/:id');
    try {
      const body = req.body as Partial<{ title: string; description: string }>;

      const result = await this.memesService.patchImage(id, body);

      res.status(HttpStatus.ACCEPTED).send(result);
    } catch (error) {
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send('Operation not allowed');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    this.logger.log('DELETE memes/:id');
    const imageToDelete = await this.memesService.getImageById(id);

    if (imageToDelete) {
      await this.s3Service
        .s3Instance()
        .deleteObject({
          Bucket: process.env.AWS_MEMES_BUCKET_NAME,
          Key: imageToDelete.imageName,
        })
        .promise();

      const result = await this.memesService.deleteImage(id);

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
    this.logger.log('POST memes');
    const body = req.body as { caption: string; title: string; tags: string };

    try {
      const image = await this.memesService.saveImageMetadata({
        id: null,
        description: body?.caption,
        category: ImageCategory.MEME,
        title: body?.title,
        url: file.location,
        imageName: file.key,
        user: null,
        tags: JSON.parse(body?.tags ?? '[]') || [],
      });
      res.send(image);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('image/:key')
  async getImageByKey(@Param('key') key: string, @Res() res: Response) {
    this.logger.log('GET memes/:key');
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
