import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogMetadata } from '../database/entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogMetadata) private readonly blogRepository: Repository<BlogMetadata>,
  ) {}

  public async saveBlog(blog: BlogMetadata) {
    const createdBlog = await this.blogRepository.save(blog);
    if (createdBlog) {
      const { content, ...others } = createdBlog;

      return others;
    }
  }

  public getBlogs() {
    return this.blogRepository.find({
      select: ['id', 'author', 'coverPhoto', 'createdAt', 'title', 'updatedAt', 'tags'],
    });
  }

  public getBlog(id: number) {
    return this.blogRepository.findOne(id);
  }
}
