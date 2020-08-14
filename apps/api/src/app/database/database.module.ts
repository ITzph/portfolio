import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSkill } from './entities/user-skill.entity';
import { UserExperience } from './entities/user-experience.entity';
import { UserCertification } from './entities/user-certification.entity';
import { ImageMetadata } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<string>('PORTFOLIO_DB_TYPE') as any,
          host: configService.get<string>('PORTFOLIO_DB_HOST'),
          port: Number.parseInt(configService.get<string>('PORTFOLIO_DB_PORT'), 10),
          username: configService.get<string>('PORTFOLIO_DB_USERNAME'),
          password: configService.get<string>('PORTFOLIO_DB_PASSWORD'),
          database: configService.get<string>('PORTFOLIO_DB_DATABASE'),
          entities: [
            User,
            UserSkill,
            UserExperience,
            UserCertification,
            ImageMetadata,
            ImageMetadata,
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
