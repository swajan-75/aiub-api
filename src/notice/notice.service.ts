import { Injectable } from "@nestjs/common";
import { ScraperService } from "src/scraper/scraper/scraper.service";

@Injectable()
export class NoticeService {
    constructor(private readonly scraperService : ScraperService){}
    
    test(){
        return "This is notice service";
    }
    async getNotices(count :number){
       return await this.scraperService.get_notices(1,count);
    }

    async get_faculties(){
        return await this.scraperService.get_all_faculties();
    }
}