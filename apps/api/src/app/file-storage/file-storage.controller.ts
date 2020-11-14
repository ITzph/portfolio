import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCategory } from '@portfolio/api-interfaces';
import { FilesS3Service } from './files-s3.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('files')
export class FileStorageController {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly s3Service: FilesS3Service,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getALlFiles() {
    return this.fileStorageService.getAllFiles();
  }

  @Get('')
  getALlPublicFiles() {
    return this.fileStorageService.getAllPublicFiles();
  }

  @Get(':key')
  async getFileByKey(@Param('key') key: string, @Res() res: Response) {
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

  @Get('resume/download')
  async getResume(@Query('fileType') fileType, @Res() res: Response) {
    const resumeS3Key = `${process.env.RESUME_S3_KEY}_${fileType}`;
    try {
      const s3GetRes = await this.s3Service
        .s3Instance()
        .getObject({ Bucket: process.env.AWS_FILES_BUCKET_NAME, Key: resumeS3Key })
        .promise();

      res.status(HttpStatus.OK).set('Content-Type', 'application/pdf').send(s3GetRes.Body);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.fileStorageService.deleteById(id);

    if (result.affected) {
      return res.send({ id });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'File to delete not found!' });
    }
  }

  @UseGuards(JwtAuthGuard)
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
        isPrivate: true,
        createdAt: new Date(),
      });
      res.send(resultingFile);
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const fileToUpdate = req.body;
    return this.fileStorageService.patchFile(id, fileToUpdate);
  }
}
