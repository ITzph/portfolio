import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserSkill } from '../database/entities/user-skill.entity';
import { UserExperience } from '../database/entities/user-experience.entity';
import { UserCertification } from '../database/entities/user-certification.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([User, UserSkill, UserExperience, UserCertification])],
})
export class ProfileModule {}
