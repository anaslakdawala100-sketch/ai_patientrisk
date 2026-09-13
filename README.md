# PulseAI — HealthTech Patient Risk Platform

AI-assisted patient monitoring dashboard built for Finlatics Web Development
(Level 2, Project 4): predicts patient risk, summarizes patient history, and
helps doctors triage faster.

## Stack

- React 18 + Vite
- React Router (protected routes)
- Tailwind CSS
- lucide-react icons
- Context API for auth + patient state

## Features

- **Patient dashboard** — searchable, filterable grid of patients with live vitals
- **Risk prediction flow** — deterministic, explainable scoring (`src/utils/riskCalculators.js`) based on vitals, age, and history
- **AI-generated summaries** — natural-language patient summaries + risk factor breakdown (`src/services/aiService.js`)
- **Responsive medical UI** — mobile-first layout, collapsible sidebar
- **Role-based access** — doctor / nurse / admin login gates routes via `ProtectedRoute`

## Getting started

```bash
npm install
npm run dev
```

Then sign in with any name (no password) and pick a role — the demo auth is
session-only (`sessionStorage`) and exists to demonstrate the protected-route
pattern, not to be production auth.

## Notes on the "AI" layer

`src/services/aiService.js` mocks the AI calls locally (with simulated
latency) so the whole flow works without a live API key. It's written as a
drop-in seam: swap its two functions for real `fetch` calls to a backend
endpoint that calls an LLM provider server-side. See `.env.example` for the
intended config shape. Never call an LLM provider directly from the browser
with an embedded key.

## Project structure

```
src/
  components/
    ai/        AI summary modal + risk factor card
    common/     ProtectedRoute
    layout/     Navbar, Sidebar, TopHeader (search/filter)
    patient/    PatientCard, HistoryList, VitalsChart, RiskBadge
  context/      AuthContext, PatientContext
  hooks/        useAuth, usePatients, usePatientSummary
  pages/        Login, Dashboard, PatientDetails
  services/     api.js (mock patient data), aiService.js (mock AI)
  utils/        riskCalculators.js, formatters.js
  data/         mockPatients.js, mockVitals.js
```
