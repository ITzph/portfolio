import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserSkill } from '../database/entities/user-skill.entity';
import { UserExperience } from '../database/entities/user-experience.entity';
import { UserCertification } from '../database/entities/user-certification.entity';
import { LoggerModule } from '../logger/logger.module';
import { ExperienceController } from './experience/experience.controller';
import { ExperienceService } from './experience/experience.service';
import { SkillModule } from './skill/skill.module';

@Module({
  controllers: [ProfileController, ExperienceController],
  providers: [ProfileService, ExperienceService],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User, UserSkill, UserExperience, UserCertification]),
    SkillModule,
  ],
})
export class ProfileModule {}
