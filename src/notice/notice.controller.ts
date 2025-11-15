import { Controller, Get, Param } from "@nestjs/common";
import { NoticeService } from "./notice.service";
@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}
    @Get('test')
    testNoticeService() {
        return this.noticeService.test();
    }
    @Get('faculty')
    async get_all_faculty() {
        return await this.noticeService.get_faculties();
    }
    @Get(':size')
    async getNotices(@Param('size') size?:number) {
        const count = size ? size : 10;
        return await this.noticeService.getNotices(count);
    }

    
    

    
}