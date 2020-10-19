import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserSkill } from '@portfolio/api-interfaces';
import { Repository } from 'typeorm';
import { UserSkill } from '../../database/entities/user-skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(UserSkill)
    private readonly experienceRepository: Repository<UserSkill>,
  ) {}

  patchSkill(id: number, skill: Partial<IUserSkill>) {
    return this.experienceRepository.save({
      id,
      ...skill,
    });
  }
}
