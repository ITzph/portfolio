import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '@portfolio/api-interfaces';
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

  public patchBlog(id: number, blog: Partial<Blog>) {
    return this.blogRepository.save({
      id,
      ...blog,
    });
  }

  public getBlog(id: number) {
    return this.blogRepository.findOne(id);
  }

  public deleteBlog(id: number) {
    return this.blogRepository.delete(id);
  }
}
