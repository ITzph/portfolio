import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MemesModule } from './memes/memes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProfileModule, DatabaseModule, ConfigModule.forRoot({}), MemesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
