import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.info('LOG', process.env.PORTFOLIO_DB_TYPE);
console.info('LOG', process.env.PORT);
console.info('LOG', process.env.PORTFOLIO_DB_HOST);
console.info('LOG', process.env.PORTFOLIO_DB_PORT);
console.info('LOG', process.env.PORTFOLIO_DB_USERNAME);
console.info('LOG', process.env.PORTFOLIO_DB_PASSWORD);
console.info('LOG', process.env.PORTFOLIO_DB_DATABASE);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const a = {
          appPort: configService.get<string>('PORT') as any,
          type: configService.get<string>('PORTFOLIO_DB_TYPE') as any,
          host: configService.get<string>('PORTFOLIO_DB_HOST'),
          port: Number.parseInt(configService.get<string>('PORTFOLIO_DB_PORT'), 10),
          username: configService.get<string>('PORTFOLIO_DB_USERNAME'),
          password: configService.get<string>('PORTFOLIO_DB_PASSWORD'),
          database: configService.get<string>('PORTFOLIO_DB_DATABASE'),
        };

        console.info('GINO CONFIGURATIONS', a);
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
export class DatabaseModule {}
