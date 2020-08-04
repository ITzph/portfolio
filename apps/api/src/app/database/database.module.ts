import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.info(configService.get<string>('PORTFOLIO_DB_TYPE'));
        console.info(configService.get<string>('PORTFOLIO_DB_HOST'));
        console.info(configService.get<string>('PORTFOLIO_DB_PORT'));
        console.info(configService.get<string>('PORTFOLIO_DB_USERNAME'));
        console.info(configService.get<string>('PORTFOLIO_DB_PASSWORD'));
        console.info(configService.get<string>('PORTFOLIO_DB_DATABASE'));
        return {
          type: configService.get<string>('PORTFOLIO_DB_TYPE') as any,
          host: configService.get<string>('PORTFOLIO_DB_HOST'),
          port: Number.parseInt(configService.get<string>('PORTFOLIO_DB_PORT'), 10),
          username: configService.get<string>('PORTFOLIO_DB_USERNAME'),
          password: configService.get<string>('PORTFOLIO_DB_PASSWORD'),
          database: configService.get<string>('PORTFOLIO_DB_DATABASE'),
          entities: [User],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  constructor() {
    console.info('gino', process.env.PORTFOLIO_DB_TYPE);
    console.info('gino', process.env.PORTFOLIO_DB_HOST);
    console.info('gino', process.env.PORTFOLIO_DB_PORT);
    console.info('gino', process.env.PORTFOLIO_DB_USERNAME);
    console.info('gino', process.env.PORTFOLIO_DB_PASSWORD);
    console.info('gino', process.env.PORTFOLIO_DB_DATABASE);
  }
}
