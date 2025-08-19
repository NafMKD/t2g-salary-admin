# Frontend - T2G Salary Admin

Next.js 14 admin panel for managing user salaries.  
Uses TailwindCSS v4 and Lucide icons for styling and UI.

## Features

- Admin login form
- Auth persisted via localStorage
- Protected admin routes
- Salary table with:
  - Inline edit (with save and validation)
  - Delete with confirmation modal
  - Pagination (prev, next, limited page range)
  - Client-side search
- Responsive design with modern UI

## Requirements

- Node.js 20+
- npm or pnpm

## Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in the `frontend/` folder and set backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

## Project Structure

```
/src
  /app/admin        → admin pages
  /components       → UI components
    /salary-table  → table + pagination + delete modal
  /hooks            → auth token hook
  /lib/api.js       → API helpers
```

## Build

```bash
npm run build
npm run start
```

Runs a production build on port `3000`.