import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IUser } from '@portfolio/api-interfaces';
import { UserSkill } from './user-skill.entity';
import { UserExperience } from './user-experience.entity';

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column('date', { name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column('simple-array', { default: 'Hello world' })
  greetings: string[];

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'current_role', nullable: true })
  currentRole: string;

  @Column({ name: 'current_company', nullable: true })
  currentCompany: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @OneToMany('UserSkill', 'user', { eager: true })
  skills: UserSkill[];

  @OneToMany('UserExperience', 'user', { eager: true })
  experiences: UserExperience[];
}
