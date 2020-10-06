import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Blog } from '@portfolio/api-interfaces';

@Entity({ name: 'blog_metadata' })
export class BlogMetadata implements Blog {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'content' })
  content: string;

  @Column('simple-array', { name: 'tags' })
  tags: string[];

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'cover_photo' })
  coverPhoto: string;
}
