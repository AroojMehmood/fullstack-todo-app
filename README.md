# TaskFlow — Full-Stack Task Management Platform

A production-ready full-stack productivity app built on top of an existing MERN Todo application. TaskFlow lets users organize their work into **Projects**, break each project down into **Tasks**, and still keep a simple standalone **Todo list** for quick day-to-day items — all behind secure, role-based authentication.

**Live Demo:** https://fullstack-todo-app-gold-iota.vercel.app
**Backend API:** https://fullstack-todo-app-production-1d45.up.railway.app

---

## Table of Contents

- [Features](#features)
- [How to Use the App](#how-to-use-the-app)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Authentication & Authorization](#authentication--authorization)
- [Database Overview](#database-overview)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Case Study](#case-study)
- [Future Improvements](#future-improvements)

---

## Features

- 🔐 **Authentication** — Signup, login, logout with JWT, protected frontend and backend routes
- 👥 **Role-based permissions** — Regular users manage their own data; admins get a read-only application-wide overview
- 📁 **Projects** — Full CRUD, each project has a title, description, and status (Active / On Hold / Completed)
- ✅ **Tasks** — Full CRUD, each task belongs to a project, with status (To Do / In Progress / Completed), priority (Low / Medium / High), and an optional due date
- 📝 **Todos** — The original standalone todo list is fully preserved, independent from Projects/Tasks
- 📊 **Dashboard** — Real-time stats pulled directly from the database (projects, tasks, completion counts, high-priority tasks, todos)
- 🛡️ **Data isolation** — Every user only ever sees their own projects, tasks, and todos, enforced on the backend
- 🎨 **Responsive UI** — Light pink/lavender glassmorphism theme, works across desktop, tablet, and mobile
- 🧪 **Automated tests** — 10 backend tests (Jest + Supertest + in-memory MongoDB) and 6 frontend tests (Vitest + React Testing Library)

---

## How to Use the App

1. **Sign up / Log in** — Create an account or log in with existing credentials.
2. **Dashboard** (`/dashboard`) — The landing page after login. Shows a real-time summary: total projects, total tasks, completed/pending tasks, high-priority tasks, and todos, plus a list of your most recent projects.
3. **Projects** (`/projects`) — Lists all your projects. Click **"+ New Project"** to create one. Each project shows its status and can be edited or deleted from this page.
   - **Clicking a project's title opens that project's detail page**, where you can add, view, edit, and delete the **Tasks** that belong to it. This is the main way task management is accessed — there is no separate "Tasks" tab in the navbar, because tasks always live inside a project.
4. **Todos** (`/todos`) — A simple, independent checklist. Unlike Projects/Tasks, todos are **not** linked to any project — they're for quick, unstructured items (e.g. "buy groceries", "submit assignment"). Add, complete, edit, and delete todos here exactly as in the original Todo app.
5. **Admin** (`/admin`, admin accounts only) — Visible in the navbar only to users with the `admin` role. Shows total users/projects/tasks across the whole application and a list of registered users. Regular users are redirected away if they try to access this URL directly.
6. **Logout** — Available from the navbar on every page.

---

## Technology Stack

**Frontend:** React (Vite), React Router, Context API, plain CSS
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose ODM), hosted on MongoDB Atlas
**Auth:** JSON Web Tokens (JWT), bcrypt password hashing
**Testing:** Jest + Supertest + mongodb-memory-server (backend), Vitest + React Testing Library (frontend)

---

## Architecture Overview

TaskFlow follows a standard MERN client-server architecture:

```
React (Vite) Frontend  ──HTTP (fetch)──▶  Express REST API  ──Mongoose──▶  MongoDB Atlas
   localhost:5173                            localhost:5000
```

- The frontend never talks to MongoDB directly — every request goes through the Express API, which validates the JWT, checks ownership of the requested resource, and only then reads/writes to the database.
- **React Context** (`AuthContext`, `ProjectContext`, `TaskContext`, `TodoContext`) manages client-side state and API calls, so pages/components stay focused on rendering rather than data-fetching logic.
- **Ownership-based authorization** is enforced on *every* protected backend route: a resource is only returned or modified if `owner === req.user._id` (checked in the database query itself, not just in application logic), which is what guarantees User A can never see or touch User B's data.
- The Express app is split into `app.js` (routes, middleware — no DB connection or `listen()`) and `server.js` (connects to MongoDB, then starts the app). This split lets the automated backend tests import `app.js` directly and run against an isolated in-memory database, without ever touching the real server or MongoDB Atlas.

---

## Folder Structure

```
fullstack-todo-app/
├── backend/
│   ├── app.js                     # Express app (routes + middleware), no DB/listen — used by tests
│   ├── server.js                  # Entry point: connects DB, starts the app
│   ├── config/
│   │   └── db.js                  # MongoDB connection logic
│   ├── models/
│   │   ├── user.js                # User (name, email, password hash, role)
│   │   ├── Todo.js                # Standalone todo items
│   │   ├── Project.js             # Projects (title, description, status, owner)
│   │   └── Task.js                # Tasks (title, status, priority, dueDate, project, owner)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── todoController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   ├── dashboardController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── todoRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification ("protect")
│   │   └── adminMiddleware.js     # Role check ("adminOnly")
│   └── tests/
│       ├── setup.js               # In-memory MongoDB lifecycle for Jest
│       ├── helpers.js             # Shared test helpers (register + login)
│       ├── auth.test.js
│       └── project-task.test.js
│
└── frontend/
    └── src/
        ├── api/                    # fetch()-based API layer
        │   ├── authApi.js
        │   ├── todoApi.js
        │   ├── projectApi.js
        │   ├── taskApi.js
        │   ├── dashboardApi.js
        │   └── adminApi.js
        ├── context/                 # React Context providers
        │   ├── AuthContext.jsx
        │   ├── TodoContext.jsx
        │   ├── ProjectContext.jsx
        │   └── TaskContext.jsx
        ├── components/
        │   ├── Navbar.jsx, AppLayout.jsx
        │   ├── ProtectedRoute.jsx, AdminRoute.jsx
        │   ├── TodoForm.jsx, TodoList.jsx, TodoItem.jsx, TodoSkeleton.jsx
        │   ├── ErrorMessage.jsx, Loader.jsx
        │   └── __tests__/
        ├── pages/
        │   ├── Login.jsx, Signup.jsx
        │   ├── Dashboard.jsx
        │   ├── Projects.jsx, ProjectDetails.jsx
        │   ├── Home.jsx (Todos)
        │   ├── Admin.jsx
        │   └── __tests__/
        └── styles/
            └── App.css
```

---

## Authentication & Authorization

- **Signup/Login** — Passwords are hashed with bcrypt before being stored; a JWT is issued on successful signup/login and stored in `localStorage` on the client.
- **Protected routes (frontend)** — `ProtectedRoute` wraps every page except Login/Signup; unauthenticated users are redirected to `/login`.
- **Protected routes (backend)** — The `protect` middleware verifies the JWT on every request to `/api/todos`, `/api/projects`, `/api/tasks`, `/api/dashboard`, and `/api/admin`, and attaches the authenticated user to `req.user`.
- **Roles** — Every user has a `role` of either `"user"` (default) or `"admin"`. The `adminOnly` middleware, combined with the frontend's `AdminRoute`, restricts `/admin` and `/api/admin/overview` to admin accounts only.
- **Data isolation** — Every Project/Task/Todo query is scoped with `owner: req.user._id` at the database level, so it's structurally impossible for one user's data to leak into another user's request — this was verified with dedicated automated tests (see [Running Tests](#running-tests)).

---

## Database Overview

MongoDB Atlas, accessed through Mongoose. Four collections:

| Collection | Key Fields | Relationship |
|---|---|---|
| `users` | name, email, password (hashed), role | — |
| `todos` | text, completed, user | belongs to a User |
| `projects` | title, description, status, owner | belongs to a User |
| `tasks` | title, description, status, priority, dueDate, project, owner | belongs to a Project **and** a User |

Deleting a project cascades — all of its tasks are deleted along with it.

---

## API Overview

All routes below (except `/api/auth/*`) require an `Authorization: Bearer <token>` header.

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET/POST | `/api/todos` | List / create todos |
| PUT/DELETE | `/api/todos/:id` | Update / delete a todo |
| GET/POST | `/api/projects` | List / create projects |
| PUT/DELETE | `/api/projects/:id` | Update / delete a project |
| GET/POST | `/api/tasks` | List / create tasks (optionally filter by `?project=`) |
| PUT/DELETE | `/api/tasks/:id` | Update / delete a task |
| GET | `/api/dashboard` | Real-time stats for the logged-in user |
| GET | `/api/admin/overview` | Admin-only: application-wide stats and user list |

---

## Environment Variables

**`backend/.env`** (never committed — see `backend/.env.example`):
```
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_random_jwt_secret_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`** (never committed — see `frontend/.env.example`):
```
VITE_API_URL=http://localhost:5000
```

---

## Local Setup

```bash
git clone <your-repo-url>
cd fullstack-todo-app
```

### Backend
```bash
cd backend
npm install
cp .env.example .env   # then fill in your real MongoDB URI and JWT secret
npm run dev
```
Expected output: `✅ MongoDB connected: ...` and `✅ Server running on http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # defaults to http://localhost:5000, fine for local dev
npm run dev
```
Expected output: `Local: http://localhost:5173/`

---

## Running Tests

### Backend (10 tests — Jest + Supertest + in-memory MongoDB)
```bash
cd backend
npm test
```
Tests never touch the real MongoDB Atlas database — a temporary in-memory MongoDB instance is spun up automatically for the test run and destroyed afterward.

### Frontend (6 tests — Vitest + React Testing Library)
```bash
cd frontend
npm test
```

**Total: 16 automated tests**, covering happy paths, validation failures, and cross-user authorization/data-isolation cases.

---

## Deployment

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas

Both the frontend and backend are connected to this GitHub repository, so pushing to the main branch automatically triggers a redeploy on both platforms — no manual redeployment steps are required after the initial setup. Environment variables are configured directly in each platform's dashboard (not committed to the repo).

---

## Case Study

**Problem:**
Task and project management tools are often either too simple (a flat todo list, no structure) or too complex (heavyweight project management suites). Students and early-career developers frequently need something in between: a way to track multiple projects, break them into actionable tasks, and still keep a quick scratchpad for miscellaneous to-dos — all in one place, with their data kept private and secure.

**Solution:**
TaskFlow extends a working MERN Todo app into a two-tier system: **Projects** contain **Tasks**, while the original **Todos** feature remains available independently for quick, unstructured items. A real-time dashboard gives an at-a-glance view of progress, and role-based permissions allow for a lightweight admin view without over-engineering a full permissions system.

**Technology choices:**
- **React** — component reusability made it straightforward to extend the existing Todo UI patterns (forms, lists, loading/error/empty states) to Projects and Tasks without duplicating logic.
- **Node/Express** — a lightweight, unopinionated framework that matched the existing backend and made it easy to add new resources (Projects, Tasks) following the same controller/route/middleware pattern already in place for Todos.
- **MongoDB** — the Project → Task relationship and flexible schema (optional fields like `dueDate`) suited a document database better than forcing a rigid relational structure for a project of this scope.
- **JWT** — stateless authentication meant the existing auth system could be reused as-is for the new resources, simply by reusing the same `protect` middleware.

**Challenge:**
Introducing automated backend tests without risking the real production database was a key constraint — the project explicitly required that tests never touch the live MongoDB Atlas cluster used in production.

**How it was solved:**
The Express app was split into `app.js` (pure route/middleware setup, no side effects) and a thin `server.js` entry point that only connects to the database and starts listening. This allowed the test suite to import `app.js` directly and run it against a temporary `mongodb-memory-server` instance spun up fresh for each test run — completely isolated from both the developer's local database and the production Atlas cluster, with zero risk of touching real user data.

---

## Future Improvements

- Search and filter for Tasks/Projects (by title, status, priority)
- File attachments on tasks
- Email notifications for upcoming due dates
- Drag-and-drop task board (Kanban view)
- Dark mode toggle