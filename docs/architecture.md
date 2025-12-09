1. Project Structure
📁 root/
├── docs/
│   └── architecture.md        # This file
├── backend/
│   ├── src/
│   │   ├── controllers/       # Handles API requests and responses
│   │   ├── services/          # Business logic and data fetching
│   │   ├── utils/             # Helper functions (e.g., CSV import)
│   │   ├── routes/            # API route definitions
│   │   ├── models/            # Mongoose schemas (Transaction)
│   │   └── index.js           # Entry point for the backend server
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components: SearchBar, FilterPanel, etc.
│   │   ├── pages/             # Page components (Dashboard)
│   │   ├── routes/            # React Router routes (if used)
│   │   ├── services/          # Axios API calls (fetchTransactions)
│   │   ├── utils/             # Helper functions
│   │   ├── hooks/             # Custom hooks (useTransactions)
│   │   ├── styles/            # Tailwind CSS configuration & custom styles
│   │   └── main.jsx / App.jsx # Entry point for frontend
│   ├── public/                # Static assets
│   ├── package.json
│   └── README.md



2. Backend Architecture

Technology Stack: Node.js, Express.js, MongoDB, Mongoose, dotenv, cors, csv-parser

Components

index.js

Entry point for backend server.

Connects to MongoDB using Mongoose.

Configures middleware: CORS, JSON parsing.

Loads API routes (e.g., /api/transactions).

Models

Transaction.js: Defines MongoDB schema for transactions including fields like CustomerName, ProductCategory, Tags, TotalAmount, etc.

Controllers

transactionController.js: Handles API requests and responses. Calls service functions to fetch transactions based on filters, search, sorting, and pagination.

Services

transactionService.js: Implements business logic.

Builds MongoDB queries using filters, search keywords, and sorting fields.

Handles pagination and calculates totals.

Routes

transactionRoutes.js: Maps HTTP GET requests to the controller functions.

Utils

importCsv.js: Reads CSV files, parses transaction data, and imports them into MongoDB.

Deletes old data to avoid duplicates.

Converts numeric fields properly.

Logs number of records imported.

Backend Flow

User requests transaction data via frontend API call.

Route /api/transactions is triggered.

Controller calls service to fetch filtered, sorted, and paginated transactions.

Service queries MongoDB and returns JSON response.

Backend sends data to frontend.





3. Frontend Architecture

Technology Stack: React, Vite, Tailwind CSS, Axios, react-icons

Components

App.jsx / main.jsx

Entry point.

Renders Dashboard component.

Dashboard

Manages state for search, filters, sorting, and pagination.

Uses useTransactions hook to fetch data from backend.

Calculates total units, total amount, and total discount.

Passes data to TransactionTable and Pagination.

SearchBar

Text input to search by customer name or phone number.

Updates search state.

FilterPanel

Provides multiple filtering options:

Gender, Age, Customer Region, Product Category, Tags, Payment Method, Date Range

Supports custom date ranges.

Reset button clears all filters.

SortDropdown

Select field to sort by Customer Name, Date, or Quantity.

Sorting is always ASC by default.

TransactionTable

Displays filtered, sorted, and paginated transactions in a table.

Supports hover effects and structured data display.

Pagination

Provides Prev/Next buttons to navigate pages.

Disables buttons at first/last page.

Hooks

useTransactions

Fetches transaction data from backend API.

Accepts search, filters, sorting, and pagination as parameters.

Returns transaction data and total pages.

Services

transactions.js

Implements Axios API calls to fetch transaction data.

Handles query params and ensures safe requests.



4. Data Flow

CSV file → importCsv.js → MongoDB (Transaction collection)

Frontend requests /api/transactions with filters/search/page

Backend controller → service → MongoDB query

Backend returns JSON with:

data: paginated transactions

total, page, pageSize, totalPages

Frontend receives data and:

Updates TransactionTable

Updates totals display (units, amount, discount)

Handles pagination



5. Communication & Integration

Frontend ↔ Backend

Axios requests from useTransactions to http://localhost:5000/api/transactions.

Backend responds with JSON.

Frontend dynamically updates UI based on response.

Backend ↔ Database

Mongoose manages queries and schema validation.

Handles filtering, sorting, and pagination efficiently.

CSV Seeding

Ensures MongoDB has initial dataset.

Converts CSV values to proper types before inserting.



6. Environment Configuration

Backend .env

PORT=5000
MONGO_URI="mongodb://localhost:27017/retailsales"


Frontend

Configured to communicate with backend at http://localhost:5000.

Tailwind CSS imported via index.css.



7. Summary

Backend: Node.js + Express + MongoDB, handles all data operations.

Frontend: React + Tailwind CSS, dynamic UI with search, filters, sorting, and pagination.

CSV Data: Seeds initial dataset into MongoDB.

Workflow: CSV → MongoDB → API → React UI → User interaction → API calls → Filtered & paginated display.

Extensibility: Easy to add more filters, fields, or data sources.