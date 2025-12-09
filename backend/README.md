 Retail Sales Backend

## Setup
1. Ensure Node.js 18+ is installed.
2. Place dataset CSV at `src/data/sales.csv`. Make sure column headers match or update loader.js mapping.
3. Install:
   - Open Terminal / PowerShell in `backend/`
   - Run: `npm install`

## Start
- Dev (auto reload): `npm run dev`
- Production: `npm start`
Server defaults to port 3001 (change via PORT env var).

## Endpoints
- GET /api/sales
  Query examples:
  - Search: `/api/sales?q=John`
  - Page & size: `/api/sales?page=2&pageSize=10`
  - Sort newest first: `/api/sales?sort=date:desc`
  - Sort by customer name A-Z: `/api/sales?sort=customerName:asc`
  - Filters (comma-separated or repeated): `/api/sales?productCategory=Electronics,Books&gender=Male&ageMin=20&ageMax=40`
  - Date range: `/api/sales?dateFrom=2024-01-01&dateTo=2024-12-31`
  - Tags: `/api/sales?tags=summer,clearance`

- GET /api/sales/:id
  - Returns a single sale by internal `_id` or other identifiers (adjust loader if you have an explicit order id).

## Notes
- Full-text search uses Fuse.js and searches Customer Name & Phone Number, case-insensitive and fuzzy.
- All filters are combinable and maintain state when passed together.
- Default page size is 10.
