import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';

import { FacultyModule } from './faculty/faculty.module';
import { ScraperModule } from './scraper/scraper/scraper.module';

@Module({
  imports: [NoticeModule,ScraperModule , FacultyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
