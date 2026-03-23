import { Injectable } from "@nestjs/common";
import { ScraperService } from "src/scraper/scraper/scraper.service";

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

@Injectable()
export class NoticeService {
  constructor(private readonly scraperService: ScraperService) {}

  test() {
    return "This is notice service";
  }

  private parse_date(notice: any): Date {
    const day = parseInt(notice.date) || 1;
    const month = MONTHS[notice.month] ?? 0;
    const year = parseInt(notice.year) || new Date().getFullYear();
    return new Date(year, month, day);
  }


  private async get_all_notices(): Promise<any[]> {
    const result = await this.scraperService.get_notices(1, 100) as any;
    return result.data;
  }

  async getNotices(count: number) {
    return await this.scraperService.get_notices(1, count);
  }

  async get_sorted_by_date(order: 'asc' | 'desc' = 'desc') {
    const list = await this.get_all_notices();
    const sorted = [...list].sort((a, b) => {
      const dateA = this.parse_date(a).getTime();
      const dateB = this.parse_date(b).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
    return {
      status: 'success',
      total: sorted.length,
      order,
      data: sorted
    };
  }


  async get_last_week() {
    const list = await this.get_all_notices();
    const now = new Date();
    const one_week_ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = list.filter(n => this.parse_date(n) >= one_week_ago);
    return {
      status: 'success',
      total: result.length,
      from: one_week_ago.toDateString(),
      to: now.toDateString(),
      data: result
    };
  }

 
  async get_last_month() {
    const list = await this.get_all_notices();
    const now = new Date();
    const one_month_ago = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const result = list.filter(n => this.parse_date(n) >= one_month_ago);
    return {
      status: 'success',
      total: result.length,
      from: one_month_ago.toDateString(),
      to: now.toDateString(),
      data: result
    };
  }
}