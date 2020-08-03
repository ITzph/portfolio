import { Injectable } from '@nestjs/common';
import { Profile } from '@portfolio/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);

    return {
      name: `${user.firstName} ${user.lastName}`,
      image: '',
      address: 'Planet Earth',
      currentCompany: 'Krusty Krab',
      currentRole: 'Tank',
      testimonial: 'Hoy',
      greetings: [],
    };
  }

  public getCurrentProfile(): Profile {
    return {
      name: 'Carlo Gino Catapang',
      image: '',
      address: 'Planet Earth',
      currentCompany: 'Krusty Krab',
      currentRole: 'Tank',
      testimonial: 'Hoy',
      greetings: [
        'The quick brown fox jumps over the lazy dog.',
        'Five boxing wizards jump quickly',
        'Test Changes',
        'Welcome to my Page!',
      ],
    };
  }
}
