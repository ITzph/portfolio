import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { IUserExperience } from '@portfolio/api-interfaces';

@Entity({ name: 'user_experience' })
export class UserExperience implements IUserExperience {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'role', nullable: true })
  role: string;

  @Column('date', { name: 'start_date', nullable: true })
  startDate: Date;

  @Column('date', { name: 'end_date', nullable: true })
  endDate: Date;

  @Column('mediumtext', { name: 'events', default: '' })
  events: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
