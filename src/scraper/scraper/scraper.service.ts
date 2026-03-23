import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Redis } from '@upstash/redis';

const FACULTY_CACHE_KEY = 'faculty:all';
const FACULTY_CACHE_TTL = 60 * 30; 

@Injectable()
export class ScraperService {

  private redis: Redis;

  constructor() {

    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  getHello(): string {
    return 'Hello from Scraper Service!';
  }

  base_url = "https://www.aiub.edu/"

  async get_notices(notice_page_number: number = 1, number_of_notices: number = 10) {
    

    const NOTICE_CACHE_KEY = `notice:${notice_page_number}:${number_of_notices}`;
    const NOTICE_CACHE_TTL = 60 * 10; 

   
    const cached = await this.redis.get(NOTICE_CACHE_KEY);
    if (cached) {
      console.log(`Returning cached notices for page ${notice_page_number}`);
      return cached;
    }

    console.log('Cache miss — fetching notices from AIUB...');

    const url = this.base_url + "category/notices?pageNo=" + notice_page_number + "&pageSize=" + number_of_notices;
    const data = await axios.get(url);
    const $ = cheerio.load(data.data);
    const notices: any[] = [];

    $('.notification').each((i, elem) => {
      const date = $(elem).find('.date-custom').text().trim().split(/\s+/)[0];
      const month = $(elem).find('.date-custom').text().trim().split(/\s+/)[1];
      const year = $(elem).find('.date-custom span').text().trim();
      const title = $(elem).find('.title').text().trim();
      const desc = $(elem).find('.desc').text().trim();

      let link = $(elem).find('a').first().attr('href');
      if (link && !link.startsWith('http')) {
        link = this.base_url.replace(/\/$/, "") + link;
      }
      notices.push({ date, month, year, title, desc, link });
    });

    const response = {
      status: 'success',
      data: notices
    };

   
    await this.redis.set(NOTICE_CACHE_KEY, response, { ex: NOTICE_CACHE_TTL });
    console.log('Notices cached successfully');

    return response;
  }

  async get_all_faculties() {

    const cached = await this.redis.get(FACULTY_CACHE_KEY);
    if (cached) {
      console.log('Returning cached faculty data');
      return cached;
    }

    console.log('Cache miss — fetching from AIUB...');

    const url = "https://www.aiub.edu/Files/Uploads/public-employee-profiles/employeeProfiles.json?v=1.0.13";
    const data = await axios.get(url);
    const list = data.data.EmployeeProfileLightList;

    const result = list.map((item: any) => {
      const personal = item.CvPersonal || {};
      const extra = item.PersonalOtherInfo || {};

      return {
        name: personal.Name || "",
        email: personal.Email || "",
        faculty: item.Faculty || "",
        designation: item.Designation || "",
        position: item.Position || "",
        department: item.HrDepartment || "",
        profile_photo: extra.SecondProfilePhoto
          ? "https://www.aiub.edu" + extra.SecondProfilePhoto
          : null,
        profile_link: personal.Email
          ? `https://www.aiub.edu/faculty-list/faculty-profile?q=${personal.Email.split('@')[0]}#${personal.Email}`
          : null,
        room_number: extra.RoomNo || "",
        building_number: extra.BuildingNo || "",
        academic_interests: extra.AcademicInterests
          ? extra.AcademicInterests.split(',').map((x: string) => x.trim()).filter((x: string) => x.length)
          : [],
        research_interests: extra.ResearchInterests
          ? extra.ResearchInterests.split(',').map((x: string) => x.trim()).filter((x: string) => x.length)
          : []
      };
    });

    result.sort((a: any, b: any) => a.name.localeCompare(b.name));

    const response = {
      status: "success",
      total: result.length,
      data: result
    };

    await this.redis.set(FACULTY_CACHE_KEY, response, { ex: FACULTY_CACHE_TTL });
    console.log('Faculty data cached successfully');

    return response;
  }

}