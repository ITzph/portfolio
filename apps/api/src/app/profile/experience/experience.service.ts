import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserExperience } from '@portfolio/api-interfaces';
import { Repository } from 'typeorm';
import { UserExperience } from '../../database/entities/user-experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(UserExperience)
    private readonly experienceRepository: Repository<UserExperience>,
  ) {}

  patchExperience(id: number, experience: Partial<IUserExperience>) {
    return this.experienceRepository.save({
      id,
      ...experience,
    });
  }

  addExperience(experience: UserExperience) {
    return this.experienceRepository.save(experience);
  }

  deleteExperience(id: number) {
    return this.experienceRepository.delete(id);
  }
}
