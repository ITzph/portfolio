import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IImageMetadata, ImageCategory } from '@portfolio/api-interfaces';
import { User } from './user.entity';

@Entity({ name: 'image_metadata' })
export class ImageMetadata implements IImageMetadata {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'image_name', length: 50 })
  imageName: string;

  @Column({ default: '' })
  description: string;

  @Column('varchar', { length: 20 })
  category: ImageCategory;

  @Column({ default: '', length: 50 })
  title: string;

  @Column()
  url: string;

  @Column('simple-array', { name: 'image_tags' })
  tags: string[];

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
