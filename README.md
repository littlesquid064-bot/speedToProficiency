# Speed to Proficiency Refactored

This project has been refactored into a Client/Server architecture.

## Structure

- `backend/`: Node.js Express backend serving API and data.
- `frontend/`: React (Vite) frontend.

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Client runs on http://localhost:5173

## Features

- **Login**: Use `priya.sharma@acme.com` or other demo emails available in the login screen.
- **Assessment**: Self-rating and Knowledge tests are validated against backend scenarios.
- **Dashboard**: Displays calculated results, recommended modules, and career path from backend.