import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogMetadata } from '../database/entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogMetadata) private readonly blogRepository: Repository<BlogMetadata>,
  ) {}

  public saveBlog(blog: BlogMetadata) {
    return this.blogRepository.save(blog);
  }

  public getBlogs() {
    return this.blogRepository.find();
  }

  public getBlog(id: number) {
    return this.blogRepository.findOne(id);
  }
}
