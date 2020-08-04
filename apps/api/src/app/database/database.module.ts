import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: (configService.get<string>('PORTFOLIO_DB_TYPE') as any) || 'mariadb',
          host: configService.get<string>('PORTFOLIO_DB_HOST') || '127.0.0.1',
          port: Number.parseInt(configService.get<string>('PORTFOLIO_DB_PORT') || '6603', 10),
          username: configService.get<string>('PORTFOLIO_DB_USERNAME') || 'root',
          password: configService.get<string>('PORTFOLIO_DB_PASSWORD') || 'carlogino',
          database: configService.get<string>('PORTFOLIO_DB_DATABASE') || 'portfolio',
          entities: [User],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  constructor() {}
}
