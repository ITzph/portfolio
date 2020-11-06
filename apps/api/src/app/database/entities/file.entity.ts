import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IFileMetadata, FileCategory } from '@portfolio/api-interfaces';

@Entity({ name: 'file_metadata' })
export class FileMetadata implements IFileMetadata {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'file_name', length: 50 })
  fileName: string;

  @Column({ unique: true })
  key: string;

  @Column({ default: '' })
  description: string;

  @Column('varchar', { length: 30 })
  category: FileCategory;

  @Column()
  url: string;

  @Column('simple-array', { name: 'file_tags' })
  tags: string[];

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;
}
