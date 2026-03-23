![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)

# AIUB Public API (Unofficial)

A modern, open-source REST API providing **publicly available data** from **American International University–Bangladesh (AIUB)** — including faculty details, departments, designations, and university notices.

Ideal for **developers, students, dashboards, and automation tools**.

🔗 **Base URL:** `https://aiub-public-api.vercel.app`

---

## ⚠️ Disclaimer

This project is **not affiliated with, endorsed by, or officially connected to AIUB**.
All data is sourced from publicly accessible pages on the official website: https://www.aiub.edu

This project does **not** store or expose any private, sensitive, or restricted information.

---

## ✨ Features

- 🔓 Public & non-sensitive data only
- ⚡ Redis-cached responses for fast performance
- 📦 Clean, developer-friendly JSON structure
- 🔍 Search, filter, sort, and stats on faculty data
- 📝 Notice filtering by date range
- 🧩 Easy integration into apps, bots, or dashboards
- 🛠 Open-source and community-focused

---

## 🏗 Tech Stack

- **NestJS** — backend framework
- **TypeScript** — language
- **Axios** — HTTP requests
- **Cheerio** — HTML scraping
- **Upstash Redis** — response caching
- **Vercel** — deployment

---

## 📡 API Endpoints

### 📝 Notice API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notice/:size` | Get latest notices. Default 10. |
| GET | `/notice/sorted?order=desc` | Sort notices by date. `order=asc` or `order=desc` |
| GET | `/notice/last-week` | Notices from the last 7 days |
| GET | `/notice/last-month` | Notices from the last 30 days |

---

### 👨‍🏫 Faculty API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faculty/all` | All faculty sorted by name |
| GET | `/faculty/search?name=john` | Search faculty by name |
| GET | `/faculty/department?name=CSE` | Filter by department name |
| GET | `/faculty/departments` | List all unique departments |
| GET | `/faculty/stats/department` | Faculty count per department |
| GET | `/faculty/stats/designation` | Faculty count per designation |
| GET | `/faculty/sorted?by=department` | Sort faculty by field (`name`, `department`, `designation`, `faculty`) |

---

## 📦 Response Formats

### GET `/notice/:size`

```json
{
  "status": "success",
  "data": [
    {
      "date": "16",
      "month": "Mar",
      "year": "2026",
      "title": "Holiday Notice: 26th March 2026",
      "desc": "Independence & National Day",
      "link": "https://www.aiub.edu/holiday-notice-26th-march-2026"
    }
  ]
}
```

---

### GET `/notice/last-week`

```json
{
  "status": "success",
  "total": 3,
  "from": "Mon Mar 16 2026",
  "to": "Mon Mar 23 2026",
  "data": [...]
}
```

---

### GET `/faculty/all`

```json
{
  "status": "success",
  "total": 850,
  "data": [
    {
      "name": "John Doe",
      "email": "john.doe@aiub.edu",
      "faculty": "Faculty of Science & Technology",
      "designation": "Associate Professor",
      "position": "Faculty",
      "department": "Department of Computer Science",
      "profile_photo": "https://www.aiub.edu/path/to/photo.jpg",
      "profile_link": "https://www.aiub.edu/faculty-list/faculty-profile?q=john.doe#john.doe@aiub.edu",
      "room_number": "602",
      "building_number": "6",
      "academic_interests": ["Machine Learning", "Data Science"],
      "research_interests": ["Deep Learning", "AI"]
    }
  ]
}
```

---

### GET `/faculty/stats/department`

```json
{
  "status": "success",
  "total_departments": 12,
  "data": [
    { "department": "Department of Computer Science", "count": 120 },
    { "department": "Department of EEE", "count": 85 }
  ]
}
```

---

### GET `/faculty/departments`

```json
{
  "status": "success",
  "total": 12,
  "data": [
    "Department of Computer Science",
    "Department of EEE",
    "Department of BBA"
  ]
}
```

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/swajan-75/aiub-api.git
cd aiub-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Upstash Redis credentials

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`.

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Get your free Redis credentials at [upstash.com](https://upstash.com).

---

## ⚡ Caching

All responses are cached using **Upstash Redis** to minimize load on AIUB's servers and improve response times.

| Endpoint | Cache TTL |
|----------|-----------|
| `/faculty/*` | 30 minutes |
| `/notice/*` | 10 minutes |

---

## 🤝 Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
