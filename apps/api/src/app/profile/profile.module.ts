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
import { SkillService } from './skill/skill.service';
import { SkillController } from './skill/skill.controller';

@Module({
  controllers: [ProfileController, ExperienceController, SkillController],
  providers: [ProfileService, ExperienceService, SkillService],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User, UserSkill, UserExperience, UserCertification]),
  ],
})
export class ProfileModule {}
