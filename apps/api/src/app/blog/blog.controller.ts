import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request } from 'express';
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
}
