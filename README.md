# Speed to Proficiency

Speed to Proficiency is a comprehensive learning and assessment platform built on a modern Client/Server architecture. It enables users to evaluate their professional skills through self-assessments, knowledge tests, and AI-driven scenario analysis, providing a personalized dashboard with recommended learning modules and career paths.

## Architecture

The project is split into two primary components:

- `client/` — A React frontend built with Vite for assessments and dashboard visualization.
- `server/` — A Node.js Express backend handling authentication, assessment content, proficiency evaluation, and AI scenario analysis.

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm

### Server Setup

```bash
cd server
npm install
npm run dev
```

The server runs on `http://localhost:5000`. Add a `.env` file with the necessary API keys (e.g., `LITELLM_API_KEY`) to enable AI evaluations.

### Client Setup

```bash
cd client
npm install
npm run dev
```

The client is accessible at `http://localhost:5173`.

## Application Flow

1. **Authentication** — Users log in with demo credentials (e.g., `priya.sharma@acme.com`). The system loads a scenario based on the user's role.
2. **Genie Intro** — A personalized introduction to the proficiency journey.
3. **Self-Rating** — Users rate their confidence across core competencies.
4. **Knowledge Test** — Objective questions to validate technical and theoretical understanding.
5. **Scene Analysis** — AI-evaluated business scenarios where users respond to professional challenges.
6. **Data Integration** — The system syncs data from Microsoft Teams, CRM, and Mentor Feedback.
7. **Dashboard** — Final view with real-time proficiency scores, recommended learning paths, and career trajectory.

## Features

- **5-Source Proficiency Model** — Scores weighted across Self-Assessment, Knowledge Tests, Teams Activity, CRM Data, and Mentor Feedback.
- **AI-Powered Evaluation** — LLMs provide real-time feedback and scores for subjective scenario responses.
- **Personalized Learning Paths** — Modules recommended dynamically based on assessment results.
- **Responsive Dashboard** — Visualizes skill gaps and progress through interactive UI components.
- **Multi-Role Support** — Tailored scenarios for Technical Leads, Sales Directors, and Architecture roles.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Vanilla CSS |
| Backend | Node.js, Express, Axios |
| AI | LiteLLM (Llama-based models) |
| Data | JSON-based scenario management |