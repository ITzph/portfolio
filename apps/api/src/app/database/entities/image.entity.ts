import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Entity({ name: 'image_metadata' })
export class ImageMetadata implements IImageMetadata {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'image_name', length: 50 })
  imageName: string;

  @Column()
  caption: string;

  @Column()
  url: string;
}
