import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_skill' })
export class UserSkill {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'category' })
  category: string;

  @Column('boolean', { name: 'is_current' })
  isCurrent: boolean;

  @ManyToOne('User', 'skills')
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
