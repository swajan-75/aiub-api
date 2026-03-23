import { Injectable } from '@nestjs/common';
import { ScraperService } from 'src/scraper/scraper/scraper.service';

@Injectable()
export class FacultyService {
  constructor(private readonly scraperService: ScraperService) {}

  private async get_list(): Promise<any[]> {
    const all = await this.scraperService.get_all_faculties() as any;
    return all.data;
  }

  async get_all() {
    return await this.scraperService.get_all_faculties();
  }

  async search_by_name(name: string) {
    if (!name) return { status: 'error', message: 'name query param is required' };
    const list = await this.get_list();
    const result = list.filter(f =>
      f.name.toLowerCase().includes(name.toLowerCase())
    );
    return { status: 'success', total: result.length, data: result };
  }

  async filter_by_department(name: string) {
    if (!name) return { status: 'error', message: 'name query param is required' };
    const list = await this.get_list();
    const result = list.filter(f =>
      f.department.toLowerCase().includes(name.toLowerCase())
    );
    return { status: 'success', total: result.length, data: result };
  }

  async get_all_departments() {
    const list = await this.get_list();
    const departments = [
      ...new Set(list.map(f => f.department).filter(d => d))
    ].sort();
    return { status: 'success', total: departments.length, data: departments };
  }

  async stats_by_department() {
    const list = await this.get_list();
    const stats: Record<string, number> = {};
    list.forEach(f => {
      const dept = f.department || 'Unknown';
      stats[dept] = (stats[dept] || 0) + 1;
    });
    const sorted = Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .map(([department, count]) => ({ department, count }));
    return { status: 'success', total_departments: sorted.length, data: sorted };
  }

  async stats_by_designation() {
    const list = await this.get_list();
    const stats: Record<string, number> = {};
    list.forEach(f => {
      const desig = f.designation || 'Unknown';
      stats[desig] = (stats[desig] || 0) + 1;
    });
    const sorted = Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .map(([designation, count]) => ({ designation, count }));
    return { status: 'success', total_designations: sorted.length, data: sorted };
  }

  async get_sorted(by: string) {
    const allowed = ['department', 'designation', 'name', 'faculty'];
    if (!allowed.includes(by)) {
      return { status: 'error', message: `Invalid sort field. Allowed: ${allowed.join(', ')}` };
    }
    const list = await this.get_list();
    const sorted = [...list].sort((a, b) =>
      (a[by] || '').localeCompare(b[by] || '')
    );
    return { status: 'success', total: sorted.length, data: sorted };
  }
}