🚀 Retail Sales Dashboard Backend Setup

This directory contains the Node.js/Express backend service for the Retail Sales Dashboard, which manages data filtering, sorting, and retrieval from MongoDB.

1. 🛠️ Prerequisites

Node.js (LTS version recommended)

MongoDB running locally or a cloud-hosted instance.

The raw transaction data file (e.g., transactions.csv) must be placed in the backend/ root directory for seeding.

2. ⚙️ Installation

Navigate to the backend directory:

cd backend


Install the required dependencies (Express, Mongoose, dotenv, etc.):

npm install

3. 🔑 Environment Variables (.env)

Create a file named .env in the root of the backend/ directory and add the following configuration:

PORT=5000
MONGO_URI="mongodb://localhost:27017/retailsales"


Replace the URI above with your actual MongoDB connection string if using a remote DB.

4. 📤 Data Seeding (Loading CSV into MongoDB)

You must run the seeding script once to load your transaction data from the CSV file into the MongoDB database before starting the application.

Place your CSV data file (e.g., transactions.csv) into the backend/ root directory.

Navigate to the directory containing the seeding script:

cd backend/src/models/uploads


Run the import script:

node importCsv.js


This script will delete all existing data in the Transaction collection and load the new data from the CSV. You should see a success message upon completion:
"CSV import completed: [X] records added"

5. ▶️ Running the Backend

Return to the backend/ root directory and start the server:

cd ../../
npm start
# OR for development with auto-restarts:
# npm run dev


The backend server will start and listen on the port specified in your .env file (default: http://localhost:5000).

💻 frontend/README.md (Revised)
🚀 Retail Sales Dashboard Frontend Setup

This directory contains the React application built with Vite and styled using Tailwind CSS, providing the user interface for the dashboard.

1. 🛠️ Prerequisites

Node.js (LTS version recommended)

The backend server must be running and accessible (default: http://localhost:5000) and the database must be seeded.

2. ⚙️ Installation

Navigate to the frontend directory:

cd frontend


Install the required dependencies (React, react-icons, Tailwind CSS tooling, Axios, etc.):

npm install

3. ▶️ Running the Frontend

Start the React development server:

npm run dev


The application will typically be accessible in your browser at http://localhost:5173.

4. 🌐 Connection Details

The frontend is configured to communicate with the backend API at http://localhost:5000. Ensure this port matches the PORT set in your backend's .env file.

5. 🧭 Usage

Open your browser to the frontend URL (e.g., http://localhost:5173).

The Dashboard component will use the useTransactions hook to fetch data.

Use the Search Bar, Filter Panel, and Sort Dropdown to manipulate the displayed transaction data.

The Pagination controls allow you to navigate through the filtered and sorted results.