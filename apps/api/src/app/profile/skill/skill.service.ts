import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserSkill } from '@portfolio/api-interfaces';
import { Repository } from 'typeorm';
import { UserSkill } from '../../database/entities/user-skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(UserSkill)
    private readonly skillRepository: Repository<UserSkill>,
  ) {}

  patchSkill(id: number, skill: Partial<IUserSkill>) {
    return this.skillRepository.save({
      id,
      ...skill,
    });
  }

  addSkill(skill: IUserSkill) {
    return this.skillRepository.save(skill);
  }
}
