import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.PORTFOLIO_DB_HOST,
      port: Number.parseInt(process.env.PORTFOLIO_DB_PORT, 10),
      username: process.env.PORTFOLIO_DB_USERNAME,
      password: process.env.PORTFOLIO_DB_PASSWORD,
      database: process.env.PORTFOLIO_DB_DATABASE,
      entities: [User],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
