import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCategory } from '@portfolio/api-interfaces';
import { FilesS3Service } from './files-s3.service';

@Controller('files')
export class FileStorageController {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly s3Service: FilesS3Service,
  ) {}

  @Get('')
  getALlFiles() {
    return this.fileStorageService.getAllFiles();
  }

  @Get(':key')
  async getImageByKey(@Param('key') key: string, @Res() res: Response) {
    try {
      const s3GetRes = await this.s3Service
        .s3Instance()
        .getObject({ Bucket: process.env.AWS_FILES_BUCKET_NAME, Key: key })
        .promise();

      res.status(HttpStatus.OK).set('Content-Type', 'application/octet-stream').send(s3GetRes.Body);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.fileStorageService.deleteById(id);

    if (result.affected) {
      return res.send({ id });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'File to delete not found!' });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addNewFile(@UploadedFile() file, @Req() req: Request, @Res() res: Response) {
    const body = req.body as { fileName: string; description: string; category: FileCategory };

    try {
      const resultingFile = await this.fileStorageService.addNewFile({
        id: null,
        description: body?.description,
        category: body?.category,
        url: file.location,
        fileName: body?.fileName,
        key: file.key,
        tags: [],
        createdAt: new Date(),
      });
      res.send(resultingFile);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const fileToUpdate = req.body;
    return this.fileStorageService.patchFile(id, fileToUpdate);
  }
}
