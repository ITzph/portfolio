import { Injectable } from '@nestjs/common';
import { IUser } from '@portfolio/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

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

  public async getCurrentProfile(): Promise<IUser> {
    const username = process.env.MY_USERNAME;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    user.experiences = user.experiences.sort((a, b) => {
      if (new Date(a.startDate).getTime() === new Date(a.startDate).getTime()) {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      }
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    return user;
  }
}
