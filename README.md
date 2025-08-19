# T2G Salary Admin

A full-stack salary administration system built with Laravel 12 (backend) and Next.js 14 (frontend).  
The system provides secure admin-only management of user salary records with upsert, edit, delete, and search capabilities.  

## Features

- Admin authentication with Laravel Sanctum
- RESTful API with role-based policies
- Repository + Service pattern backend
- Soft deletes for all models
- Salary upsert by email (restores if soft deleted)
- Frontend admin panel built with Next.js and TailwindCSS
- Responsive UI with search, pagination, inline editing, and delete confirmation modal
- Persistent auth via localStorage
- Feature and unit tests (backend)

## Tech Stack

- **Backend:** Laravel 12, Sanctum, MySQL
- **Frontend:** Next.js 14, TailwindCSS v4, Lucide Icons
- **Tests:** PHPUnit (feature + unit)

## Project Structure

```

/docs         → project documentation (roadmap, schema)
/src
  /backend      → Laravel API
  /frontend     → Next.js frontend

```

## Getting Started

Each part (backend and frontend) has its own README with setup instructions.