import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request, Response } from 'express';
import { BlogMetadata } from '../database/entities/blog.entity';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

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

  @Get()
  getBlogs() {
    return this.blogService.getBlogs();
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
