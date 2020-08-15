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
    try {
      const result = await this.memesService.deleteImage(id);
      if (result.affected) {
        return res.send({ id });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Req() req: Request, @Res() res: Response) {
    const body = req.body as { caption: string; title: string };

    try {
      const image = await this.memesService.saveImageMetadata({
        id: null,
        caption: body?.caption ?? '',
        url: file.location,
        imageName: file.originalname,
        user: null,
      });
      res.send(image);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('image/:id')
  getImageByName(@Param('id') id: string, @Res() res: Response) {
    this.s3Service
      .s3Instance()
      .getObject({ Bucket: process.env.AWS_MEMES_BUCKET_NAME, Key: id }, (err, data) => {
        if (err) {
          res.status(HttpStatus.NOT_FOUND).send('Image not found');
        } else {
          res.status(HttpStatus.OK).send(data.Body);
        }
      });
  }
}
