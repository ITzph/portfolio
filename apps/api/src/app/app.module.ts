import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { EmailModule } from './email/email.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ProfileModule,
    DatabaseModule,
    ConfigModule.forRoot({}),
    PhotosModule,
    AuthModule,
    LoggerModule,
    EmailModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
