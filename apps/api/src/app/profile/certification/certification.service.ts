import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCertification } from '../../database/entities/user-certification.entity';

@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(UserCertification)
    private readonly certificationRepository: Repository<UserCertification>,
  ) {}

  patchCertification(id: number, certification: Partial<UserCertification>) {
    return this.certificationRepository.save({
      id,
      ...certification,
    });
  }

  addCertification(experience: UserCertification) {
    return this.certificationRepository.save(experience);
  }

  deleteCertification(id: number) {
    return this.certificationRepository.delete(id);
  }
}
