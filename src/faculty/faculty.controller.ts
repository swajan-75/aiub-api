import { Controller, Get, Query } from '@nestjs/common';
import { FacultyService } from './faculty.service';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get('all')
  async get_all() {
    return await this.facultyService.get_all();
  }

  @Get('search')
  async search(@Query('name') name: string) {
    return await this.facultyService.search_by_name(name);
  }

  @Get('department')
  async filter_by_department(@Query('name') name: string) {
    return await this.facultyService.filter_by_department(name);
  }

  @Get('departments')
  async get_all_departments() {
    return await this.facultyService.get_all_departments();
  }

  @Get('stats/department')
  async stats_by_department() {
    return await this.facultyService.stats_by_department();
  }

  @Get('stats/designation')
  async stats_by_designation() {
    return await this.facultyService.stats_by_designation();
  }

  @Get('sorted')
  async get_sorted(@Query('by') by: string) {
    return await this.facultyService.get_sorted(by);
  }
}