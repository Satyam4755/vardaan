# Vardaan Labs MERN Project

Full-stack MERN website for a software and web-service company, built from scratch with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose data layer
- MVC architecture on the backend
- JWT cookie-based authentication
- Protected client dashboard
- Dynamic build-request pricing

## Project Structure

```text
.
├── backend
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       └── utils
├── frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── data
│       ├── pages
│       ├── styles
│       └── utils
└── .env.example
```

## Features

- Home page with hero, services, pricing, and call-to-action sections
- Signup, login, logout, and current-user session checks
- Protected `Request Build` form and dashboard
- Dynamic pricing based on package, extra features, and deployment
- Build requests stored with user reference, pricing breakdown, and timestamps
- Modular backend structure ready for future admin-panel expansion

## Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Create environment files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Update the example values if needed:

- `backend/.env`
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `FRONTEND_URL`
  - `NODE_ENV`
- `frontend/.env`
  - `VITE_API_URL`

5. Run the backend:

```bash
cd backend
npm run dev
```

6. Run the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

## Default Pricing Logic

- Basic: `3000`
- Intermediate: `8000`
- Professional: `15000`
- Deployment add-on: `500`
- Extra feature: `500` each
- Maintenance: included by company
