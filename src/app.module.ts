import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { FacultyModule } from './faculty/faculty.module';
import { ScraperModule } from './scraper/scraper/scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env
    NoticeModule,
    ScraperModule,
    FacultyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}