# Kudwatest UI – Financial Reporting Demo

This project is a demo financial reporting dashboard built with **React**, **TypeScript**, **Vite**, and **Material UI**, using **Bun** as the package manager and runtime. It is designed to showcase a simple, modern UI for integrating, displaying, and analyzing profit-and-loss data from a backend API.

## Features

- **Data Integration**: Upload or trigger backend ETL (Extract, Transform, Load) to import financial data via a dedicated UI.
- **Profit & Loss Table**: Interactive, expandable table for structured financial reports with nested line items.
- **Dashboard Analytics**: Visual dashboard with key metrics, trend charts, and insights.
- **Material UI**: Clean, responsive design using Material UI components.
- **TypeScript**: Full type safety across the codebase.
- **Bun**: Fast development and package management.

## Project Structure

```
kudwatest-ui/
├── docs/                # Product and backend API documentation
│   ├── prd.md           # Product requirements (frontend spec)
│   └── backend.md       # Backend API and data model
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and SVGs
│   ├── components/      # Reusable UI components (tables, charts, cards, etc.)
│   ├── hooks/           # Custom React hooks (e.g., data fetching)
│   ├── pages/           # Top-level pages (Dashboard, Data Integration, etc.)
│   ├── services/        # API service functions for backend communication
│   ├── types/           # TypeScript type definitions (entities, API, ETL)
│   ├── utils/           # Utility functions (formatters, metrics, etc.)
│   ├── App.tsx          # Main app component with routing and theme
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── package.json         # Project metadata and scripts
├── bun.lock             # Bun lockfile
├── vite.config.ts       # Vite configuration
├── tsconfig*.json       # TypeScript configuration
└── README.md            # Project documentation (this file)
```

## Backend Integration

- The frontend communicates with a TypeScript Express API (see `docs/backend.md`) using REST endpoints.
- Main integration is via the `/api/etl` endpoint for uploading financial data in bulk.
- All API responses follow a standard `{ success, data, message }` or `{ success, error }` format.

## Main Screens

- **Profit & Loss Table**: Shows monthly reports, expandable to view detailed line items by category/account.
- **Dashboard Analytics**: Visualizes trends, highlights best/worst months, and provides key financial insights.
- **Data Integration**: Lets users upload or trigger ETL data integration, with progress feedback and sample data support.

## How to Run

1. **Install dependencies** (using Bun):
   ```bash
   bun install
   ```
2. **Start the development server:**
   ```bash
   bun run dev
   ```
3. **(Optional) Configure backend API URL:**
   - Set `VITE_API_BASE_URL` in a `.env` file if your backend is not on `http://localhost:3000/api`.

## Customization & Extending

- Add new pages in `src/pages/` and link them via `src/App.tsx`.
- Add new API endpoints in `src/services/api.ts` and types in `src/types/`.
- Update the UI using Material UI components for consistency.

## Documentation

- **Frontend requirements:** See `docs/prd.md`
- **Backend API & data model:** See `docs/backend.md`

---

This project is a demo and is intentionally kept simple for clarity and ease of extension. For questions or improvements, see the documentation files in the `docs/` folder.
