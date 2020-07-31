import { Injectable } from '@nestjs/common';
import { Profile } from '@portfolio/api-interfaces';

@Injectable()
export class ProfileService {
  getCurrentProfile(): Profile {
    return {
      name: 'Carlo Gino Catapang',
      image: '',
      address: 'Mars',
      currentCompany: 'Krusty Krab',
      currentRole: 'Tank',
      testimonial: 'Hoy',
      greetings: [
        'The quick brown fox jumps over the lazy dog.',
        'Five boxing wizards jump quickly',
        'Welcome to my Page!',
      ],
    };
  }
}
