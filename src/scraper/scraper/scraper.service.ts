import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';


@Injectable()
export class ScraperService {
    getHello(): string {
        return 'Hello from Scraper Service!';
    }
    base_url ="https://www.aiub.edu/"
    //notice_page_number =1;
    //number_of_notices = 10;

    async get_notices(notice_page_number: number =1, number_of_notices : number =10){
        // defult notice return
        const url = this.base_url+"category/notices?pageNo="+notice_page_number+"&pageSize="+number_of_notices;
        const data = await axios.get(url);

        const $ = cheerio.load(data.data);
        const notices : any[] = [];
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
            notices.push({date, month, year, title, desc, link});
        
    });
        return {
            status: 'success',
            data: notices
        }
}

    async get_all_faculties(){
        const url = "https://www.aiub.edu/Files/Uploads/public-employee-profiles/employeeProfiles.json?v=1.0.13"
        const data = await axios.get(url);

         const list = data.data.EmployeeProfileLightList;

    const result = list.map(item => {
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
                ? extra.AcademicInterests.split(',').map(x => x.trim()).filter(x => x.length)
                : [],

            research_interests: extra.ResearchInterests
                ? extra.ResearchInterests.split(',').map(x => x.trim()).filter(x => x.length)
                : []
        };
    });
     result.sort((a, b) => a.name.localeCompare(b.name));

    return {
        status: "success",
        total: result.length,
        data: result
    };;

        
        
    }





}
