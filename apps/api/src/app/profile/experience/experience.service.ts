import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserExperience } from '@portfolio/api-interfaces';
import { Repository } from 'typeorm';
import { UserExperience } from '../../database/entities/user-experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(UserExperience) private readonly userRepository: Repository<UserExperience>,
  ) {}

  patchExperience(id: number, experience: Partial<IUserExperience>) {
    return this.userRepository.save({
      id,
      ...experience,
    });
  }

  addExperience(experience: IUserExperience) {
    return this.userRepository.save(experience);
  }
}
