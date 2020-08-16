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
} from '@nestjs/common';
import { MemesService } from './memes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

import { MemesS3Service } from './memes-s3.service';
import { ImageCategory } from '../../database/entities/image.entity';

@Controller('memes')
export class MemesController {
  constructor(
    private readonly memesService: MemesService,
    private readonly s3Service: MemesS3Service,
  ) {}

  @Get()
  fetchAllImages() {
    return this.memesService.fetchAllMemes();
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) id, @Res() res: Response) {
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

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Req() req: Request, @Res() res: Response) {
    const body = req.body as { caption: string; title: string };

    try {
      const image = await this.memesService.saveImageMetadata({
        id: null,
        description: body?.caption,
        category: ImageCategory.MEME,
        title: body?.title,
        url: file.location,
        imageName: file.key,
        user: null,
      });
      res.send(image);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('image/:id')
  async getImageByName(@Param('id') id: string, @Res() res: Response) {
    try {
      const s3GetRes = await this.s3Service
        .s3Instance()
        .getObject({ Bucket: process.env.AWS_MEMES_BUCKET_NAME, Key: id })
        .promise();

      res.status(HttpStatus.OK).set('Content-Type', 'image/*').send(s3GetRes.Body);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }
}
