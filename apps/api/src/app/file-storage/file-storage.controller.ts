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
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { Request, Response } from 'express';
import { FileMetadata } from '../database/entities/file.entity';

@Controller('files')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get('')
  getALlFiles() {
    return this.fileStorageService.getAllFiles();
  }

  @Get(':id')
  getOneFilete(@Param('id', ParseIntPipe) id: number) {
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

  @Post('')
  addNewFile(@Req() req: Request) {
    const file: FileMetadata = req.body;

    return this.fileStorageService.addNewFile(file);
  }

  @Patch(':id')
  patchExperience(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const fileToUpdate = req.body;
    return this.fileStorageService.patchFile(id, fileToUpdate);
  }
}
