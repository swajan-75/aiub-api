![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
#  AIUB Public API (Unofficial)
A modern, open-source REST API providing **publicly available JSON data** from 
**American International University–Bangladesh (AIUB)**. Includes **faculty details, departments, designations, and university notices**. 
Ideal for **developers, students, dashboards, and automation tools**.


---
## ⚠️ Disclaimer  
This project is **not affiliated with, endorsed by, or officially connected to AIUB**.  
All data is collected from publicly accessible sources on the official website:  
🔗 https://www.aiub.edu  
Only **non-sensitive and publicly available information** is included.

This project does **not** store or expose any private, sensitive, or restricted information.

---

## ✨ Features
- 🔓 **Public & Non-Sensitive Data Only**  
- ⚡ Fast REST API responses  
- 📦 Clean, developer-friendly JSON structure  
- 🔍 Faculty, Departments, Designation, and general academic info  
- 🔄 Consistent data formatting  
- 🧩 Easy integration into apps, bots, or dashboards  
- 🛠 Open-source and community-focused  

---

## 🏗 Tech Stack
- **NestJS** 
- REST API  
- TypeScript
- axios 

---

## 📡 API Endpoints

### 📝 Notice API

| Method | Endpoint        | Parameters                    | Description |
|--------|----------------|-------------------------------|-------------|
| GET    | `/notice/:size` | `size` (optional, number)     | Returns the latest notices. Default is 10 notices. |

---

### 👨‍🏫 Faculty API

| Method | Endpoint       | Parameters | Description |
|--------|----------------|------------|-------------|
| GET    | `/faculty/all` | —          | Returns all faculty data from AIUB, sorted by name. |

---

### 🔹 Notes
- Parameters in **`:`** format are path variables.  
- All responses are returned in **JSON format**.

### JSON Formates 
### 📝 Notice API (`/notice/:size`)

```json
{
  "status": "success",
  "data": [
    {
      "date": "12",
      "month": "Jan",
      "year": "2025",
      "title": "Notice Title",
      "desc": "Short description of the notice.",
      "link": "https://www.aiub.edu/some-notice-link"
    }
  ]
}
#
```

## 👨‍🏫 Faculty API Response (`/faculty/all`)

```json
{
  "status": "success",
  "total": 350,
  "data": [
    {
      "name": "John Doe",
      "email": "john.doe@aiub.edu",
      "faculty": "Faculty of Science & Technology",
      "designation": "Associate Professor",
      "position": "Faculty",
      "department": "Department of Computer Science",
      "profile_photo": "https://www.aiub.edu/path/to/photo.jpg",
      "profile_link": "https://www.aiub.edu/faculty-list/faculty-profile?q=john.doe#john.doe",
      "room_number": "602",
      "building_number": "6",
      "academic_interests": [
        "Machine Learning",
        "Data Science"
      ],
      "research_interests": [
        "Deep Learning",
        "AI"
      ]
    }
  ]
}
```




