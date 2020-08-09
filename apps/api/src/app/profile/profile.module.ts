import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserSkill } from '../database/entities/user-skill.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([User, UserSkill])],
})
export class ProfileModule {}
