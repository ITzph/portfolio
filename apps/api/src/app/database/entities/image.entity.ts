import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { User } from './user.entity';

export enum ImageCategory {
  MEME = 'MEME',
  QUOTE = 'QUOTE',
}

@Entity({ name: 'image_metadata' })
export class ImageMetadata implements IImageMetadata {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'image_name', length: 50 })
  imageName: string;

  @Column({ default: '' })
  description: string;

  @Column({ length: 20 })
  category: ImageCategory;

  @Column({ default: '', length: 50 })
  title: string;

  @Column()
  url: string;

  @Column('simple-array', { name: 'image_tags' })
  tags: string[];

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
