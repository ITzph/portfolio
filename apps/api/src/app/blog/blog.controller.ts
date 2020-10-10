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
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request, Response } from 'express';
import { BlogMetadata } from '../database/entities/blog.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Blog } from '@portfolio/api-interfaces';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNewBlog(@Req() req: Request) {
    const blog = req.body as BlogMetadata;

    return this.blogService.saveBlog({
      ...blog,
      author: 'Code Gino',
      createdAt: new Date(),
      updatedAt: new Date(),
      coverPhoto: '',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const blogToDelete = await this.blogService.getBlog(id);

    if (blogToDelete) {
      const result = await this.blogService.deleteBlog(id);

      if (result.affected) {
        return res.send({ id });
      }
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Blog not existing!' });
    }
  }

  @Get()
  getBlogs() {
    return this.blogService.getBlogs();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchBlog(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // this.logger.log('PATCH memes/:id');
    try {
      const body = req.body as Partial<Blog>;

      const result = await this.blogService.patchBlog(id, body);

      res.status(HttpStatus.ACCEPTED).send(result);
    } catch (error) {
      res.status(HttpStatus.METHOD_NOT_ALLOWED).send('Operation not allowed');
    }
  }

  @Get(':id')
  async getBlog(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const blog = await this.blogService.getBlog(id);

    if (blog) {
      return res.status(HttpStatus.OK).send(blog);
    } else {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Blog post not found',
      });
    }
  }
}
