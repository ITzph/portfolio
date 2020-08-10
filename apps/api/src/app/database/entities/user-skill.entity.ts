import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { IUserSkill } from '@portfolio/api-interfaces';

@Entity({ name: 'user_skill' })
export class UserSkill implements IUserSkill {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category', nullable: false })
  category: string;

  @Column('boolean', { name: 'is_current' })
  isCurrent: boolean;

  @Column({ default: '' })
  link: string;

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
