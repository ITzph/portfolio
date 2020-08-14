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
} from '@nestjs/common';
import { MemesService } from './memes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

import * as multerS3 from 'multer-s3';
import * as aws from 'aws-sdk';
import { ImageMetadata } from '../../database/entities/image.entity';

const s3 = new aws.S3({
  endpoint: 'http://localhost:4572',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  s3ForcePathStyle: true,
});

// @Get('image/:id')
// getImageByName(@Param() params, @Res() res: Response) {
//   const { id } = params;

//   s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: id }, function (err, data) {
//     console.log(err);
//     if (err === null) {
//       //  res.attachment('file.ext'); // or whatever your logic needs
//       //  res.send(data.Body);
//       res.status(HttpStatus.OK).send(data.Body);
//     } else {
//       res.status(HttpStatus.NOT_FOUND).send('Erooooorr');
//     }
//   });
//   return 'this url works ' + id;
// }

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
          /*I'm using Date.now() to make sure my file has a unique name*/
          const newFilename = Date.now() + file.originalname;
          req.file = newFilename;
          cb(null, newFilename);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file, @Req() req: Request, @Res() res: Response) {
    const body = req.body as { caption: string; title: string };

    try {
      const image = await this.memesService.saveImageMetadata({
        id: null,
        caption: body?.caption ?? '',
        url: file.location,
        imageName: file.originalname,
      });
      res.send(image);
    } catch (error) {
      console.error(error);
    }
  }
}
