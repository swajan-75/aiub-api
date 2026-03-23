import { Controller, Get, Param, Query } from "@nestjs/common";
import { NoticeService } from "./notice.service";

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('test')
  testNoticeService() {
    return this.noticeService.test();
  }

  // GET /notice/sorted?order=desc
  @Get('sorted')
  async get_sorted(@Query('order') order: 'asc' | 'desc' = 'desc') {
    return await this.noticeService.get_sorted_by_date(order);
  }

  // GET /notice/last-week
  @Get('last-week')
  async get_last_week() {
    return await this.noticeService.get_last_week();
  }

  // GET /notice/last-month
  @Get('last-month')
  async get_last_month() {
    return await this.noticeService.get_last_month();
  }

  // GET /notice/:size — keep this LAST always
  @Get(':size')
  async getNotices(@Param('size') size?: number) {
    const count = size ? size : 10;
    return await this.noticeService.getNotices(count);
  }
}