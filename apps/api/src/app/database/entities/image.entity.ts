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

  @Column({ enum: ImageCategory })
  category: string;

  @Column({ default: '' })
  title: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
