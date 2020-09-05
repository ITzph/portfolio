import { Injectable } from '@nestjs/common';
import { IUser } from '@portfolio/api-interfaces';
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

  public getAllUsers() {
    return this.userRepository.find();
  }

  public getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      select: ['password', 'id', 'username'],
    });
  }

  public addNewUser(user: User) {
    return this.userRepository.save(user);
  }

  public getCurrentProfile(): Promise<IUser> {
    const dummyRootUser = Number.parseInt(process.env.DUMMY_CURRENT_ID, 10);
    return this.userRepository.findOne(dummyRootUser);
  }
}
