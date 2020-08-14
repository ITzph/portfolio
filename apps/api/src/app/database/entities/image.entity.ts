import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'image_metadata' })
export class ImageMetadata {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'image_name', length: 50 })
  imageName: string;

  @Column()
  caption: string;

  @Column()
  url: string;
}
