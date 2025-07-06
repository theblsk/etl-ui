# Kudwatest API

A TypeScript Express API built with Bun, DrizzleORM, and PostgreSQL using the DAO service controller pattern.

## Features

- **Express.js** server with TypeScript
- **DrizzleORM** for database operations
- **PostgreSQL** database
- **DAO Service Controller** pattern
- **CORS** enabled
- **Bun** runtime for fast development

## Database Schema

The API manages financial reporting data with the following entities:

- **Companies**: Business entities with platform integration
- **Accounts**: Chart of accounts with categories
- **Reports**: Financial reports for specific periods
- **Line Items**: Individual entries linking accounts to reports

## Project Structure

```
src/
├── config/         # Database and server configuration
├── controllers/    # HTTP request handlers
├── db/
│   ├── schemas/    # DrizzleORM table schemas
│   ├── migrations/ # Database migrations
│   └── connection.ts
├── models/         # DAO classes for database operations
├── routes/         # Express route definitions
├── services/       # Business logic layer
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL connection details:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/kudwatest
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=kudwatest
   DB_USER=username
   DB_PASSWORD=password
   PORT=3000
   NODE_ENV=development
   ```

3. **Generate database migrations**:
   ```bash
   bun run db:generate
   ```

4. **Run migrations**:
   ```bash
   bun run db:migrate
   ```

5. **Start the development server**:
   ```bash
   bun run dev
   ```

## API Endpoints

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company
- `GET /api/companies/:id/reports` - Get company with reports

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:id` - Get account by ID
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `GET /api/accounts/search?q=term` - Search accounts
- `GET /api/accounts/category?category=name` - Get accounts by category

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get report by ID
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report
- `GET /api/reports/:id/company` - Get report with company
- `GET /api/reports/:id/line-items` - Get report with line items
- `GET /api/reports/company/:companyId` - Get reports by company

### Line Items
- `GET /api/line-items` - Get all line items
- `GET /api/line-items/:id` - Get line item by ID
- `POST /api/line-items` - Create new line item
- `POST /api/line-items/bulk` - Create multiple line items
- `PUT /api/line-items/:id` - Update line item
- `DELETE /api/line-items/:id` - Delete line item
- `GET /api/line-items/report/:reportId` - Get line items by report
- `GET /api/line-items/account/:accountId` - Get line items by account

## Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open DrizzleKit studio

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Development

The project uses:
- **Bun** for package management and runtime
- **TypeScript** for type safety
- **DrizzleORM** for database operations
- **Express.js** for HTTP server
- **CORS** for cross-origin requests

## Database Operations

The DAO pattern provides a clean separation between database operations and business logic:

1. **DAO Layer**: Direct database operations
2. **Service Layer**: Business logic and validation
3. **Controller Layer**: HTTP request/response handling

Each entity has its own DAO, Service, and Controller class with full CRUD operations.
