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

@Controller('files')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get('')
  getALlFiles() {
    return this.fileStorageService.getAllFiles();
  }

  @Get(':id')
  getOneFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileStorageService.getOneFile(id);
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
