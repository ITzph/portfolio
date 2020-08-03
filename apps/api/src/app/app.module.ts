import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProfileModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
