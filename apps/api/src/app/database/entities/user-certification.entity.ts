import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IUserCertification } from '@portfolio/api-interfaces';
import { User } from './user.entity';

@Entity({ name: 'user_certification' })
export class UserCertification implements IUserCertification {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'description', default: '' })
  description: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'provider', nullable: true })
  provider: string;

  @Column('date', { name: 'date_acquired' })
  dateAcquired: Date;

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
